@tool
class_name GAsset
extends RefCounted

## 多媒体资源加载与导入器 (Multimedia Asset Loader for Godot 4)
## 提供音效、BGM、图片纹理、视频流智能导入与异步预加载缓存池

static var _texture_cache: Dictionary = {}
static var _audio_cache: Dictionary = {}
static var _video_cache: Dictionary = {}

# ----------------------------------------------------
# 1. 音效与背景音乐加载 (Audio)
# ----------------------------------------------------

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

## 一行代码播放全局音效 (SFX)
static func play_sfx(path: String, volume_db: float = 0.0, pitch: float = 1.0, context_node: Node = null) -> AudioStreamPlayer:
	var stream = load_audio(path)
	if not stream: return null
	
	var player = AudioStreamPlayer.new()
	player.stream = stream
	player.volume_db = volume_db
	player.pitch_scale = pitch
	
	var root = context_node.get_tree().root if context_node and context_node.is_inside_tree() else Engine.get_main_loop().root
	root.add_child(player)
	player.play()
	player.finished.connect(func(): player.queue_free())
	return player

# ----------------------------------------------------
# 2. 图片与纹理资源加载 (Texture / Images)
# ----------------------------------------------------

## 加载 Texture2D 纹理 (自动缓存)
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

# ----------------------------------------------------
# 3. 视频流资源加载 (Video)
# ----------------------------------------------------

## 加载 VideoStream 视频资源 (支持 ogv 等格式)
static func load_video(path: String) -> VideoStream:
	if _video_cache.has(path):
		return _video_cache[path]
	if ResourceLoader.exists(path):
		var vid = load(path) as VideoStream
		if vid:
			_video_cache[path] = vid
			return vid
	push_warning("[GAsset] 未找到视频资源: " + path)
	return null

# ----------------------------------------------------
# 4. 资源批量异步预加载 (Preload Async)
# ----------------------------------------------------

## 异步批量加载资源列表并汇报进度
static func preload_batch(paths: Array[String], tree: SceneTree, on_progress: Callable = Callable(), on_completed: Callable = Callable()) -> void:
	var total = paths.size()
	if total == 0:
		if on_completed.is_valid(): on_completed.call()
		return
		
	var loaded = 0
	for p in paths:
		ResourceLoader.load_threaded_request(p)
		while true:
			var progress_arr: Array = []
			var status = ResourceLoader.load_threaded_get_status(p, progress_arr)
			if status == ResourceLoader.THREAD_LOAD_LOADED:
				loaded += 1
				if on_progress.is_valid():
					on_progress.call(float(loaded) / float(total), p)
				break
			elif status == ResourceLoader.THREAD_LOAD_FAILED or status == ResourceLoader.THREAD_LOAD_INVALID_RESOURCE:
				loaded += 1
				push_error("[GAsset] 预加载资源失败: " + p)
				break
			await tree.create_timer(0.01).timeout
			
	if on_completed.is_valid():
		on_completed.call()

## 清空资源缓存
static func clear_cache() -> void:
	_texture_cache.clear()
	_audio_cache.clear()
	_video_cache.clear()
