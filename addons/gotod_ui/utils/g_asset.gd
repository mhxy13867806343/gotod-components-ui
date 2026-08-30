# =========================================================================
# GAsset: Godot 4.x 全能多媒体资源加载与资产管理系统 (5 大核心方案)
# 包含：
# 方案 1. 多线程异步加载与 Await 进度条 (Threaded Async Loader with Progress)
# 方案 2. 外部文件与 MOD 贴图实时导入 (External Image & Audio Loader)
# 方案 3. 高性能全局音频对象池与 BGM 交叉淡入淡出 (Audio Pool & BGM Crossfade)
# 方案 4. 精灵图集与 SpriteSheet 动态切片 (AtlasTexture Slicer)
# 方案 5. 内存缓存池与智能卸载 (Asset Cache & Memory Purge)
# =========================================================================
@tool
class_name GAsset
extends RefCounted

static var _texture_cache: Dictionary = {}
static var _audio_cache: Dictionary = {}
static var _video_cache: Dictionary = {}

# 音频对象池 (避免频繁 new/free 产生 GC 掉帧)
static var _audio_pool: Array[AudioStreamPlayer] = []
static var _max_pool_size: int = 16
static var _bgm_player_a: AudioStreamPlayer = null
static var _bgm_player_b: AudioStreamPlayer = null
static var _current_bgm_channel: int = 0

# =========================================================================
# 方案 1. 多线程异步加载与 Await 进度条 (Threaded Async Loader)
# =========================================================================

## 异步多线程加载单个资源 (支持 await，彻底不卡顿主线程)
## @param path 资源路径 (如 "res://scenes/world_map.tscn")
## @param on_progress 进度回调 func(progress: float)
## @return 加载完成的 Resource 对象
func load_async(path: String, tree: SceneTree = null, on_progress: Callable = Callable()) -> Resource:
	if ResourceLoader.has_cached(path):
		if on_progress.is_valid(): on_progress.call(1.0)
		return ResourceLoader.load(path)
		
	var err = ResourceLoader.load_threaded_request(path)
	if err != OK:
		push_error("[GAsset] 发起异步加载失败: " + path)
		return null
		
	var progress_arr: Array = []
	while true:
		var status = ResourceLoader.load_threaded_get_status(path, progress_arr)
		var p = progress_arr[0] if progress_arr.size() > 0 else 0.0
		if on_progress.is_valid():
			on_progress.call(p)
			
		if status == ResourceLoader.THREAD_LOAD_LOADED:
			return ResourceLoader.load_threaded_get(path)
		elif status == ResourceLoader.THREAD_LOAD_FAILED or status == ResourceLoader.THREAD_LOAD_INVALID_RESOURCE:
			push_error("[GAsset] 异步加载资源失败: " + path)
			return null
			
		# 等待下一帧，释放主线程 CPU
		if tree:
			await tree.process_frame
		else:
			var main_loop = Engine.get_main_loop() as SceneTree
			if main_loop: await main_loop.process_frame

## 批量异步预加载资源列表
func preload_batch(paths: Array[String], tree: SceneTree, on_progress: Callable = Callable(), on_completed: Callable = Callable()) -> void:
	var total = paths.size()
	if total == 0:
		if on_completed.is_valid(): on_completed.call()
		return
		
	var loaded = 0
	for p in paths:
		await load_async(p, tree, func(prog: float):
			var overall = (float(loaded) + prog) / float(total)
			if on_progress.is_valid(): on_progress.call(overall, p)
		)
		loaded += 1
		
	if on_completed.is_valid():
		on_completed.call()

# =========================================================================
# 方案 2. 外部文件与 MOD 贴图实时导入 (External File & MOD Loader)
# =========================================================================

## 从本地磁盘绝对路径或 user:// 目录动态读取外部图片生成 ImageTexture (支持 PNG/JPG/WEBP)
## 适用于：玩家自定义头像、自制 MOD 贴图包、网盘/CDN 本地缓存图
static func load_external_image(file_path: String) -> ImageTexture:
	if not FileAccess.file_exists(file_path):
		push_warning("[GAsset] 外部图片文件不存在: " + file_path)
		return null
		
	var image = Image.load_from_file(file_path)
	if not image or image.is_empty():
		push_error("[GAsset] 解析外部图片文件失败: " + file_path)
		return null
		
	return ImageTexture.create_from_image(image)

# =========================================================================
# 方案 3. 高性能音频对象池与 BGM 交叉淡入淡出 (Audio Pool & BGM Crossfade)
# =========================================================================

## 一行代码播放全局音效 (自动复用 AudioStreamPlayer 缓存池，零 GC 损耗)
static func play_sfx(path: String, volume_db: float = 0.0, pitch: float = 1.0, context_node: Node = null) -> AudioStreamPlayer:
	var stream = load_audio(path)
	if not stream: return null
	
	var player = _get_idle_audio_player(context_node)
	player.stream = stream
	player.volume_db = volume_db
	player.pitch_scale = pitch
	player.play()
	return player

## 平滑切换 BGM 背景音乐 (支持双通道交叉淡入淡出 Crossfade)
static func play_bgm(path: String, fade_duration: float = 1.5, volume_db: float = 0.0, context_node: Node = null) -> void:
	var stream = load_audio(path)
	if not stream: return
	
	_ensure_bgm_players(context_node)
	
	var active_player = _bgm_player_a if _current_bgm_channel == 0 else _bgm_player_b
	var next_player = _bgm_player_b if _current_bgm_channel == 0 else _bgm_player_a
	_current_bgm_channel = 1 if _current_bgm_channel == 0 else 0
	
	next_player.stream = stream
	next_player.volume_db = -80.0
	next_player.play()
	
	var tree = context_node.get_tree() if context_node and context_node.is_inside_tree() else Engine.get_main_loop() as SceneTree
	if tree:
		var tween = tree.create_tween().set_parallel(true).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_IN_OUT)
		tween.tween_property(next_player, "volume_db", volume_db, fade_duration)
		if active_player.is_playing():
			tween.tween_property(active_player, "volume_db", -80.0, fade_duration)
			tween.finished.connect(func(): active_player.stop())
	else:
		next_player.volume_db = volume_db
		active_player.stop()

# =========================================================================
# 方案 4. 图集与 SpriteSheet 动态切片 (AtlasTexture Slicing)
# =========================================================================

## 从大图集 (SpriteSheet) 中按区域矩形切出子纹理 (AtlasTexture)
static func create_atlas_subtexture(atlas_tex: Texture2D, region_rect: Rect2) -> AtlasTexture:
	var atlas = AtlasTexture.new()
	atlas.atlas = atlas_tex
	atlas.region = region_rect
	return atlas

## 按等宽等高网格批量切出图集中的全部帧 (如 32x32 技能图标包)
static func create_grid_atlas_textures(atlas_tex: Texture2D, cell_size: Vector2) -> Array[AtlasTexture]:
	var result: Array[AtlasTexture] = []
	if not atlas_tex or cell_size.x <= 0 or cell_size.y <= 0:
		return result
		
	var tex_size = atlas_tex.get_size()
	var cols = int(tex_size.x / cell_size.x)
	var rows = int(tex_size.y / cell_size.y)
	
	for y in range(rows):
		for x in range(cols):
			var rect = Rect2(Vector2(x * cell_size.x, y * cell_size.y), cell_size)
			result.append(create_atlas_subtexture(atlas_tex, rect))
			
	return result

# =========================================================================
# 方案 5. 基础资源加载与内存缓存池 (Cache & Memory Purge)
# =========================================================================

## 加载 Texture2D 纹理 (自动内存缓存)
static func load_texture(path: String) -> Texture2D:
	if _texture_cache.has(path):
		return _texture_cache[path]
	if ResourceLoader.exists(path):
		var tex = load(path) as Texture2D
		if tex:
			_texture_cache[path] = tex
			return tex
	push_warning("[GAsset] 未找到纹理资源: " + path)
	return null

## 加载 AudioStream 资源
static func load_audio(path: String) -> AudioStream:
	if _audio_cache.has(path):
		return _audio_cache[path]
	if ResourceLoader.exists(path):
		var stream = load(path) as AudioStream
		if stream:
			_audio_cache[path] = stream
			return stream
	push_warning("[GAsset] 未找到音频资源: " + path)
	return null

## 清理释放无用内存缓存
static func clear_cache(clear_textures: bool = true, clear_audios: bool = true) -> void:
	if clear_textures: _texture_cache.clear()
	if clear_audios: _audio_cache.clear()
	_video_cache.clear()

# ----------------------------------------------------
# 内部辅助函数
# ----------------------------------------------------
static func _get_idle_audio_player(context_node: Node) -> AudioStreamPlayer:
	for p in _audio_pool:
		if is_instance_valid(p) and not p.is_playing():
			return p
			
	var new_player = AudioStreamPlayer.new()
	var root = context_node.get_tree().root if context_node and context_node.is_inside_tree() else (Engine.get_main_loop() as SceneTree).root
	root.add_child(new_player)
	
	if _audio_pool.size() < _max_pool_size:
		_audio_pool.append(new_player)
	return new_player

static func _ensure_bgm_players(context_node: Node) -> void:
	var root = context_node.get_tree().root if context_node and context_node.is_inside_tree() else (Engine.get_main_loop() as SceneTree).root
	if not is_instance_valid(_bgm_player_a):
		_bgm_player_a = AudioStreamPlayer.new()
		_bgm_player_a.bus = "Music"
		root.add_child(_bgm_player_a)
	if not is_instance_valid(_bgm_player_b):
		_bgm_player_b = AudioStreamPlayer.new()
		_bgm_player_b.bus = "Music"
		root.add_child(_bgm_player_b)
