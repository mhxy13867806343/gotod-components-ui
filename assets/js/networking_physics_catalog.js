// =========================================================================
// Gotod Components UI - Networking & Programmatic Physics Catalog
// 14. 网络通信与程序化物理 (Networking & Programmatic Physics)
// 依据 Godot 4.x 官方教程与引擎底层规范设计
// =========================================================================

window.NETWORKING_PHYSICS_CATALOG = {
  // --------------------------------------------------------
  // 14.1 高级多人联机与 RPC 架构 (High-Level Multiplayer & RPC)
  // --------------------------------------------------------
  'net-multiplayer': {
    title: '🌐 高级多人联机与 RPC 架构 (High-Level Multiplayer & RPC)',
    desc: 'Godot 4.x 提供了基于 ENetMultiplayerPeer 的高层多人游戏架构。支持主机 (Host) / 客户端模式、权威所有权 (MultiplayerAuthority)、@rpc 远程过程调用、MultiplayerSpawner 动态实体生成以及 MultiplayerSynchronizer 属性插值同步。',
    demos: [
      {
        title: '1. ENet 多人游戏房间创建与客户端加入演练 (Host & Client Room Simulator)',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:14px; color:var(--primary);">🎮 ENet 局域网/互联网房间状态机模拟器</span>
              <span id="simNetRoleTag" class="g-tag g-tag-default">未连接 (Offline)</span>
            </div>

            <!-- Server / Client Interactive Controller -->
            <div style="background:var(--bg-card); border:1px solid var(--border-base); border-radius:var(--radius); padding:16px; display:flex; flex-direction:column; gap:12px;">
              <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
                <input type="text" id="simNetIp" class="g-input" value="127.0.0.1:8910" style="width:160px; height:32px;" placeholder="IP:Port">
                <button class="g-btn g-btn-primary" style="height:32px;" onclick="
                  const roleTag = document.getElementById('simNetRoleTag');
                  const list = document.getElementById('simPeerList');
                  roleTag.className = 'g-tag g-tag-success';
                  roleTag.innerText = '服务端/房主 (Host - Peer ID 1)';
                  list.innerHTML = '<span class=\\'g-tag g-tag-primary\\'>👑 房主 (ID: 1) [本地]</span> <span class=\\'g-tag g-tag-success\\'>👤 玩家2 (ID: 384729)</span> <span class=\\'g-tag g-tag-success\\'>👤 玩家3 (ID: 948271)</span>';
                  showToast('ENetMultiplayerPeer: 服务端已成功在端口 8910 启动！', 'success');
                "><i class="fa-solid fa-server"></i> 创建主机 (Host / Server)</button>

                <button class="g-btn g-btn-success" style="height:32px;" onclick="
                  const roleTag = document.getElementById('simNetRoleTag');
                  const list = document.getElementById('simPeerList');
                  roleTag.className = 'g-tag g-tag-info';
                  roleTag.innerText = '客户端 (Client - Peer ID 582910)';
                  list.innerHTML = '<span class=\\'g-tag g-tag-primary\\'>👑 房主 (ID: 1)</span> <span class=\\'g-tag g-tag-success\\'>👤 我 (ID: 582910) [本地]</span>';
                  showToast('ENetMultiplayerPeer: 已成功连接到主机 127.0.0.1:8910！', 'info');
                "><i class="fa-solid fa-right-to-bracket"></i> 加入房间 (Join Client)</button>

                <button class="g-btn g-btn-danger" style="height:32px;" onclick="
                  const roleTag = document.getElementById('simNetRoleTag');
                  const list = document.getElementById('simPeerList');
                  roleTag.className = 'g-tag g-tag-default';
                  roleTag.innerText = '未连接 (Offline)';
                  list.innerHTML = '<span style=\\'color:var(--text-secondary); font-size:12px;\\'>暂无连接中的玩家</span>';
                  showToast('已断开多人网络连接', 'warning');
                "><i class="fa-solid fa-power-off"></i> 断开连接</button>
              </div>

              <div style="display:flex; align-items:center; gap:8px; margin-top:4px;">
                <span style="font-size:12px; color:var(--text-secondary);">在线玩家 Peers:</span>
                <div id="simPeerList" style="display:flex; gap:6px; flex-wrap:wrap;">
                  <span style="color:var(--text-secondary); font-size:12px;">暂无连接中的玩家</span>
                </div>
              </div>
            </div>

            <!-- RPC Sync Simulator -->
            <div style="display:flex; gap:10px; align-items:center;">
              <button class="g-btn g-btn-warning" onclick="
                showToast('@rpc(\\'any_peer\\', \\'call_local\\'): [RPC 广播] 玩家造成了 120 点暴击伤害！全房间 Peers 状态已同步。', 'warning');
              "><i class="fa-solid fa-bolt"></i> 模拟触发 @rpc(\"any_peer\") 广播伤害</button>
            </div>
          </div>
        `,
        code: `# =========================================================================
# Godot 4.x 高级多人游戏 ENet 与 RPC 完整核心脚本
# =========================================================================
extends Node

const PORT = 8910
const MAX_CLIENTS = 8

@onready var player_spawner: MultiplayerSpawner = $MultiplayerSpawner

func _ready() -> void:
    multiplayer.peer_connected.connect(_on_peer_connected)
    multiplayer.peer_disconnected.connect(_on_peer_disconnected)
    multiplayer.connected_to_server.connect(_on_connected_to_server)
    multiplayer.connection_failed.connect(_on_connection_failed)

# 1. 启动服务器 (Host)
func host_game() -> void:
    var peer = ENetMultiplayerPeer.new()
    var error = peer.create_server(PORT, MAX_CLIENTS)
    if error != OK:
        GMessage.error("创建服务器失败: %d" % error)
        return
    multiplayer.multiplayer_peer = peer
    GMessage.success("服务器创建成功！等待玩家加入...")
    _spawn_player(1) # 为房主生成角色

# 2. 客户端加入游戏 (Join)
func join_game(address: String = "127.0.0.1") -> void:
    var peer = ENetMultiplayerPeer.new()
    var error = peer.create_client(address, PORT)
    if error != OK:
        GMessage.error("连接服务器失败: %d" % error)
        return
    multiplayer.multiplayer_peer = peer

# 3. 玩家连接与断开回调
func _on_peer_connected(id: int) -> void:
    GMessage.info("玩家加入游戏: Peer ID %d" % id)
    if multiplayer.is_server():
        _spawn_player(id)

func _on_peer_disconnected(id: int) -> void:
    GMessage.warning("玩家离开游戏: Peer ID %d" % id)
    _remove_player(id)

# 4. 动态生成多人实体 (绑定 MultiplayerAuthority)
func _spawn_player(id: int) -> void:
    var player = preload("res://scenes/player.tscn").instantiate()
    player.name = str(id)
    player.set_multiplayer_authority(id) # 指定该 Peer 拥有控制权
    $Players.add_child(player)

# 5. @rpc 远程过程调用 (广播攻击/伤害事件)
@rpc("any_peer", "call_local", "reliable")
func apply_damage(target_peer_id: int, damage_amount: int) -> void:
    var player = $Players.get_node_or_null(str(target_peer_id))
    if player:
        player.take_damage(damage_amount)
        GMessage.warning("玩家 %d 受到 %d 点伤害！" % [target_peer_id, damage_amount])`
      }
    ]
  },

  // --------------------------------------------------------
  // 14.2 HTTP 异步网络请求 (GHttp & RESTful API)
  // --------------------------------------------------------
  'net-http': {
    title: '📡 进行 HTTP 请求与 RESTful API 客户端 (GHttp & Promise/Await)',
    desc: '封装 Godot 4.x HTTPRequest / HTTPClient。采用现代化 async/await 语法，无需手动创建与监听底层节点信号，直接返回 JSON、状态码与响应体字典。支持 HTTPS TLS 校验与表单提交。',
    demos: [
      {
        title: '1. GHttp 极简异步请求与 JSON 在线解析器',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; gap:10px; align-items:center;">
              <select id="simHttpMethod" class="select-theme" style="width:90px; height:34px; font-weight:700;">
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
              <input type="text" id="simHttpUrl" class="g-input" value="https://api.game.com/v1/user/profile" style="flex:1; height:34px;">
              <button class="g-btn g-btn-primary" style="height:34px;" onclick="
                const method = document.getElementById('simHttpMethod').value;
                const output = document.getElementById('simHttpOutput');
                const statusTag = document.getElementById('simHttpStatus');
                output.innerText = '正在发送 ' + method + ' 请求至云端服务器...';
                statusTag.className = 'g-tag g-tag-warning';
                statusTag.innerText = '200 OK (Loading)';
                setTimeout(() => {
                  statusTag.className = 'g-tag g-tag-success';
                  statusTag.innerText = 'HTTP 200 OK (142ms)';
                  output.innerHTML = JSON.stringify({
                    code: 200,
                    msg: 'success',
                    data: {
                      user_id: 'usr_882910',
                      nickname: '维亚德圣骑士',
                      level: 45,
                      gold: 88400,
                      equipped_title: '神圣誓约者',
                      server_time: new Date().toISOString()
                    }
                  }, null, 2);
                  showToast('GHttp: 请求成功返回 HTTP 200 OK', 'success');
                }, 400);
              "><i class="fa-solid fa-paper-plane"></i> 发送请求 (Await GHttp)</button>
            </div>

            <!-- Output Response Box -->
            <div style="background:#0d0d11; border:1px solid var(--border-base); border-radius:var(--radius); padding:14px; font-family:var(--font-mono); font-size:12px;">
              <div style="display:flex; justify-content:space-between; margin-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:6px;">
                <span style="color:var(--text-secondary);">Response Body:</span>
                <span id="simHttpStatus" class="g-tag g-tag-default">Idle</span>
              </div>
              <pre id="simHttpOutput" style="color:#67c23a; margin:0; line-height:1.5;">// 点击上方按钮发送异步请求查看返回的 JSON 数据</pre>
            </div>
          </div>
        `,
        code: `# =========================================================================
# GHttp: 极简 Promise / Await 异步网络请求实战 (GDScript 4.x)
# =========================================================================

# 1. 发送 GET 请求并直接解析 JSON
func fetch_player_profile() -> void:
    var res = await GHttp.get("https://api.game.com/v1/user/profile", [], 10.0, self)
    if res.ok:
        var data = res.json
        GMessage.success("欢迎回来，%s！金币: %d" % [data.data.nickname, data.data.gold])
    else:
        GMessage.error("获取玩家信息失败: %s" % res.error)

# 2. 发送 POST JSON 请求提交玩家成绩
func submit_leaderboard_score(score: int) -> void:
    var payload = {
        "user_id": "usr_882910",
        "score": score,
        "stage_id": "chapter_3_boss"
    }
    var res = await GHttp.post_json("https://api.game.com/v1/leaderboard/submit", payload, [], 10.0, self)
    if res.ok and res.status == 200:
        GMessage.success("成绩已成功同步至世界排行榜！")
    else:
        GMessage.warning("提交失败: HTTP %d" % res.status)`
      }
    ]
  },

  // --------------------------------------------------------
  // 14.3 GAxios: Axios 风格 HTTP 客户端 (推荐架构)
  // --------------------------------------------------------
  'net-axios': {
    title: '🚀 GAxios: Axios 风格现代化 HTTP 客户端 (拦截器 / 工厂 / 脱壳 / 并发)',
    desc: '深度对标前端 Axios 规范的 Godot 4.x 网络请求库。支持 axios.create() 实例工厂、统一 baseURL 与鉴权 Header、请求/响应拦截器管道 (Request/Response Interceptors)、全局 Loading 遮罩联动、401 登录失效自动拦截、业务数据自动脱壳以及 GAxios.all() 异步并发。',
    demos: [
      {
        title: '1. GAxios 实例工厂与请求/响应拦截器 Pipeline 模拟演练',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:14px; color:var(--primary);">⚡ GAxios 拦截器管道流 (Request Interceptor ➔ API ➔ Response Interceptor)</span>
              <span class="g-tag g-tag-primary">Axios 规范</span>
            </div>

            <!-- Interceptor Pipeline Flow Graphic -->
            <div style="display:grid; grid-template-columns:1fr auto 1fr auto 1fr; gap:8px; align-items:center; background:var(--bg-card); border:1px solid var(--border-base); border-radius:var(--radius); padding:16px;">
              <div style="background:var(--bg-surface); border:1px solid #409eff; border-radius:6px; padding:10px; text-align:center;">
                <div style="font-size:12px; font-weight:700; color:#409eff;">1. 请求拦截器</div>
                <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">注入 JWT Token<br>自动开启 GLoading</div>
              </div>
              <div style="color:var(--text-secondary); font-weight:800;">➔</div>
              <div style="background:var(--bg-surface); border:1px solid #67c23a; border-radius:6px; padding:10px; text-align:center;">
                <div style="font-size:12px; font-weight:700; color:#67c23a;">2. HTTP 传输</div>
                <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">baseURL 拼接<br>JSON 序列化</div>
              </div>
              <div style="color:var(--text-secondary); font-weight:800;">➔</div>
              <div style="background:var(--bg-surface); border:1px solid #e6a23c; border-radius:6px; padding:10px; text-align:center;">
                <div style="font-size:12px; font-weight:700; color:#e6a23c;">3. 响应拦截器</div>
                <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">数据自动脱壳<br>401 统一拦截提示</div>
              </div>
            </div>

            <!-- Interactive Trigger Buttons -->
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-primary" onclick="
                showToast('GAxios: [Request Interceptor] 注入 Authorization: Bearer eyJhbGci... 并展示加载圈', 'info');
                setTimeout(() => {
                  showToast('GAxios: [Response Interceptor] 响应 200 OK，数据脱壳完成: { guild_name: \\'光辉骑士团\\', members: 42 }', 'success');
                }, 800);
              "><i class="fa-solid fa-play"></i> 模拟正常请求 (200 拦截脱壳)</button>

              <button class="g-btn g-btn-warning" onclick="
                showToast('GAxios: 发送请求...', 'info');
                setTimeout(() => {
                  showToast('GAxios: [Response Interceptor] 捕获 HTTP 401: Token 已过期！自动弹出重新登录弹窗。', 'danger');
                }, 600);
              "><i class="fa-solid fa-shield-halved"></i> 模拟 401 拦截 (Token 失效劫持)</button>

              <button class="g-btn g-btn-success" onclick="
                showToast('GAxios.all: 并发触发 3 个 API 请求: [/user, /inventory, /guild]...', 'info');
                setTimeout(() => {
                  showToast('GAxios.all: 3 个并发请求全部完成！数据同步就绪。', 'success');
                }, 900);
              "><i class="fa-solid fa-arrows-split-up-and-left"></i> 模拟 GAxios.all 并发请求</button>
            </div>
          </div>
        `,
        code: `# =========================================================================
# GAxios 完整实战：实例工厂、拦截器与统一 API 模块封装 (GDScript 4.x)
# =========================================================================

# 1. 创建业务专属的 Axios 实例 (类似 api/request.js)
var http = GAxios.create({
    "base_url": "https://api.game.com/v1",
    "timeout": 8.0,
    "headers": {
        "X-Game-Version": "1.4.2",
        "X-Platform": "Godot4"
    }
})

func _ready() -> void:
    # 2. 注册请求拦截器 (Request Interceptor)
    http.interceptors.request.use(func(config: Dictionary) -> Dictionary:
        # 自动注入当前登录玩家的 Token
        var token = UserSession.get_token()
        if not token.is_empty():
            config.headers["Authorization"] = "Bearer " + token
        
        # 联动 Gotod UI 开启加载指示器
        GLoading.show("通信中...", self)
        return config
    )
    
    # 3. 注册响应拦截器 (Response Interceptor)
    http.interceptors.response.use(func(response: Dictionary) -> Dictionary:
        # 关闭全局 Loading 遮罩
        GLoading.hide()
        
        # 统一处理 401 未授权
        if response.status == 401:
            GMessage.error("登录状态已过期，请重新登录！")
            UserSession.clear_session()
            get_tree().change_scene_to_file("res://scenes/login.tscn")
            return response
            
        # 统一处理 500 服务器异常
        if response.status >= 500:
            GMessage.error("服务器繁忙，请稍后重试 (HTTP %d)" % response.status)
            return response
            
        # 业务成功提示
        if response.ok and response.data is Dictionary and response.data.has("msg"):
            GMessage.success(response.data.msg)
            
        return response
    )

# 4. 业务代码中极简调用：
func buy_shop_item(item_id: String) -> void:
    # 直接调用 post，自动拼接 base_url，自动处理拦截器
    var res = await http.post("/shop/buy", { "item_id": item_id, "amount": 1 })
    if res.ok:
        var item_info = res.data.data
        GMessage.success("成功购买：%s！剩余金币：%d" % [item_info.name, item_info.remaining_gold])

# 5. GAxios.all 并发请求
func load_player_dashboard() -> void:
    var results = await GAxios.all([
        http.get("/user/profile"),
        http.get("/inventory/list"),
        http.get("/mailbox/unread")
    ])
    var profile = results[0].data
    var inventory = results[1].data
    var mail = results[2].data
    print("玩家数据全量并发加载完成！")`
      }
    ]
  },

  // --------------------------------------------------------
  // 14.3 WebSocket 实时长连接 (GWebSocket)
  // --------------------------------------------------------
  'net-websocket': {
    title: '⚡ WebSocket 实时长连接与心跳重连 (WebSocketPeer & GWebSocket)',
    desc: '基于 Godot 4 官方 WebSocketPeer 封装的高可用长连接客户端。支持自动重连策略、心跳保活机制、JSON/文本消息广播分发与连接状态信号。',
    demos: [
      {
        title: '1. GWebSocket 实时心跳长连接与消息流演练',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; gap:10px; align-items:center;">
                <span id="simWsStatusTag" class="g-tag g-tag-danger">🔴 已断开 (Disconnected)</span>
                <span id="simWsHeartbeatTag" style="font-size:12px; color:var(--text-secondary);">心跳间隔: 15s</span>
              </div>
              <div style="display:flex; gap:8px;">
                <button class="g-btn g-btn-primary" style="height:30px; font-size:12px;" onclick="
                  const status = document.getElementById('simWsStatusTag');
                  status.className = 'g-tag g-tag-success';
                  status.innerText = '🟢 已连接 (OPEN - ws://gateway.game.com:8080)';
                  const stream = document.getElementById('simWsStream');
                  stream.innerHTML += '<div style=\\'color:#67c23a;\\'>[System] Connected to WebSocket Server successfully.</div>';
                  showToast('GWebSocket: 长连接握手成功！', 'success');
                "><i class="fa-solid fa-link"></i> 连接 (Connect)</button>
                <button class="g-btn g-btn-default" style="height:30px; font-size:12px;" onclick="
                  const status = document.getElementById('simWsStatusTag');
                  status.className = 'g-tag g-tag-danger';
                  status.innerText = '🔴 已断开 (Disconnected)';
                  const stream = document.getElementById('simWsStream');
                  stream.innerHTML += '<div style=\\'color:#f56c6c;\\'>[System] WebSocket closed (Normal closure).</div>';
                  showToast('GWebSocket: 连接已关闭', 'info');
                "><i class="fa-solid fa-link-slash"></i> 断开</button>
              </div>
            </div>

            <!-- Message Stream Terminal -->
            <div id="simWsStream" style="background:#0d0d11; border:1px solid var(--border-base); border-radius:var(--radius); padding:12px; height:130px; overflow-y:auto; font-family:var(--font-mono); font-size:12px; color:#e0e0e0; display:flex; flex-direction:column; gap:4px;">
              <div style="color:var(--text-secondary);">[System] Ready to connect to WebSocket server.</div>
            </div>

            <!-- Send Action Input -->
            <div style="display:flex; gap:8px;">
              <input type="text" id="simWsInput" class="g-input" placeholder="输入广播消息 JSON..." value='{"action":"chat","text":"全服喇叭：世界Boss已刷新！"}' style="flex:1; height:32px;">
              <button class="g-btn g-btn-warning" style="height:32px;" onclick="
                const val = document.getElementById('simWsInput').value;
                const stream = document.getElementById('simWsStream');
                stream.innerHTML += '<div style=\\'color:#ffd04b;\\'>[Send JSON] ' + val + '</div>';
                setTimeout(() => {
                  stream.innerHTML += '<div style=\\'color:#409eff;\\'>[Broadcast Recv] Broadcast ack from Server: 1,420 peers received.</div>';
                  stream.scrollTop = stream.scrollHeight;
                }, 300);
                showToast('已通过 WebSocket 发送消息', 'success');
              "><i class="fa-solid fa-paper-plane"></i> 发送数据</button>
            </div>
          </div>
        `,
        code: `# =========================================================================
# GWebSocket 长连接客户端实战 (GDScript 4.x)
# =========================================================================
extends Node

var ws_client: GWebSocket

func _ready() -> void:
    ws_client = GWebSocket.new()
    ws_client.server_url = "wss://gateway.game.com/ws"
    ws_client.auto_reconnect = true
    ws_client.heartbeat_interval = 15.0
    
    # 监听长连接事件信号
    ws_client.connected_to_server.connect(func():
        GMessage.success("与游戏实时网关建立长连接成功！")
        # 发送身份鉴权握手包
        ws_client.send_json({ "type": "auth", "token": "jwt_token_here" })
    )
    
    ws_client.json_received.connect(func(data):
        if data.type == "chat_broadcast":
            GMessage.info("【全服喇叭】%s: %s" % [data.sender, data.text])
        elif data.type == "battle_sync":
            sync_battle_state(data)
    )
    
    ws_client.disconnected_from_server.connect(func(code, reason):
        GMessage.warning("WebSocket 已断开 (%s)，正在尝试重连..." % reason)
    )
    
    add_child(ws_client)
    ws_client.connect_to_url()`
      }
    ]
  },

  // --------------------------------------------------------
  // 14.4 WebRTC 点对点 P2P 联机 (WebRTCPeerConnection)
  // --------------------------------------------------------
  'net-webrtc': {
    title: '🤝 WebRTC 点对点 P2P 联机通信 (WebRTCPeerConnection & DataChannel)',
    desc: 'Godot 4.x 原生支持 WebRTC 标准。无需中央游戏服务器中转游戏物理与战斗帧数据，由信令服务器交换 SDP 与 ICE 候选后，客户端两两建立极低延迟的 Direct DataChannel 进行直连互通。',
    demos: [
      {
        title: '1. WebRTC 信令交换与 P2P 数据通道直连工作流',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-around; align-items:center; flex-wrap:wrap; gap:16px;">
              <!-- Peer A -->
              <div style="background:var(--bg-card); border:1px solid var(--border-base); border-radius:var(--radius); padding:14px; width:220px; text-align:center;">
                <div style="font-size:32px;">📱</div>
                <div style="font-weight:700; color:var(--primary); font-size:13px; margin-top:4px;">Peer A (玩家1)</div>
                <div class="g-tag g-tag-success" style="margin-top:6px;">DataChannel: OPEN</div>
              </div>

              <!-- Signal Center -->
              <div style="display:flex; flex-direction:column; align-items:center; gap:6px;">
                <span class="g-tag g-tag-warning">📡 信令服务器 (SDP / ICE 握手)</span>
                <span style="font-size:11px; color:var(--text-secondary);">⚡ 仅在建连时交换网络地址</span>
                <span style="color:var(--primary); font-size:18px; font-weight:800;">⟷ P2P 直连数据通道 ⟷</span>
              </div>

              <!-- Peer B -->
              <div style="background:var(--bg-card); border:1px solid var(--border-base); border-radius:var(--radius); padding:14px; width:220px; text-align:center;">
                <div style="font-size:32px;">💻</div>
                <div style="font-weight:700; color:var(--success); font-size:13px; margin-top:4px;">Peer B (玩家2)</div>
                <div class="g-tag g-tag-success" style="margin-top:6px;">DataChannel: OPEN</div>
              </div>
            </div>

            <div style="font-size:12px; color:var(--text-secondary); line-height:1.6;">
              💡 <strong>适用场景</strong>：1v1 格斗对战、双人合作解谜、P2P 语音对讲与零服务器成本的局域网/跨公网游戏联机。
            </div>
          </div>
        `,
        code: `# =========================================================================
# Godot 4.x WebRTC P2P 点对点连接核心架构
# =========================================================================
var peer_connection: WebRTCPeerConnection = WebRTCPeerConnection.new()
var data_channel: WebRTCDataChannel

func setup_webrtc_peer():
    # 1. 配置 ICE 穿透服务器 (STUN)
    peer_connection.initialize({
        "iceServers": [{ "urls": ["stun:stun.l.google.com:19302"] }]
    })
    
    # 2. 监听本地生成的 ICE 候选并发送给信令服务器
    peer_connection.ice_candidate_created.connect(func(media, index, name):
        signaling_server.send_ice_candidate(media, index, name)
    )
    
    # 3. 监听本地生成的 SDP Offer/Answer
    peer_connection.session_description_created.connect(func(type, sdp):
        peer_connection.set_local_description(type, sdp)
        signaling_server.send_sdp(type, sdp)
    )
    
    # 4. 创建极低延迟不可靠数据通道 (用于 60FPS 角色位置同步)
    data_channel = peer_connection.create_data_channel("game_state", { "negotiated": true, "id": 1 })`
      }
    ]
  },

  // --------------------------------------------------------
  // 14.5 程序化物理碰撞与直接空间查询 (PhysicsDirectSpaceState2D)
  // --------------------------------------------------------
  'phys-programmatic': {
    title: '🎯 纯程序化物理碰撞与直接空间查询 (PhysicsDirectSpaceState2D & Raycast)',
    desc: '依据 Godot 4 物理引擎规范，除了在场景树中手动添加 CollisionShape2D 节点外，还可以通过 PhysicsDirectSpaceState2D 进行完全不依赖场景树节点的直接空间物理投射（射线 intersect_ray、形状投射 intersect_shape、点查询 intersect_point）与动态碰撞体构建。',
    demos: [
      {
        title: '1. GPhysics 纯代码直接空间射线探测与雷达扫描模拟器 (Live Raycast Visualizer)',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:14px; color:var(--primary);">🎯 PhysicsDirectSpaceState2D 射线投射雷达</span>
              <span id="simRaycastResultTag" class="g-tag g-tag-success">未命中障碍物 (Clear Line of Sight)</span>
            </div>

            <!-- Interactive Radar Canvas Simulation -->
            <div style="position:relative; height:180px; background:#0a0e17; border:2px solid #1a2a4a; border-radius:var(--radius); overflow:hidden; display:flex; align-items:center; justify-content:center;">
              <!-- Target Obstacle Box -->
              <div id="simObstacleBox" style="position:absolute; right:80px; top:50px; width:70px; height:80px; background:#f56c6c; border:2px solid #ff7875; border-radius:6px; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:800; font-size:11px;">
                障碍物<br>(Body2D)
              </div>

              <!-- Player Raycast Source -->
              <div style="position:absolute; left:60px; top:80px; display:flex; flex-direction:column; align-items:center;">
                <div style="font-size:32px;">🧙‍♂️</div>
                <span style="font-size:11px; color:#409eff; font-weight:700;">玩家发射点</span>
              </div>

              <!-- Laser Ray Line -->
              <div id="simLaserRay" style="position:absolute; left:95px; top:95px; width:180px; height:3px; background:linear-gradient(90deg, #409eff, #67c23a); box-shadow:0 0 8px #409eff; transition:all 0.3s ease;"></div>
              
              <!-- Hit Indicator Marker -->
              <div id="simHitPoint" style="position:absolute; left:275px; top:90px; width:12px; height:12px; background:#ff4d4f; border-radius:50%; box-shadow:0 0 10px #ff4d4f; animation:gBlink 0.4s infinite alternate;"></div>
            </div>

            <!-- Controls -->
            <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
              <button class="g-btn g-btn-primary" onclick="
                const tag = document.getElementById('simRaycastResultTag');
                const laser = document.getElementById('simLaserRay');
                const hit = document.getElementById('simHitPoint');
                laser.style.width = '180px';
                laser.style.background = 'linear-gradient(90deg, #409eff, #f56c6c)';
                hit.style.display = 'block';
                tag.className = 'g-tag g-tag-danger';
                tag.innerText = '🎯 命中障碍物: Position (275, 95), Normal (-1, 0)';
                showToast('GPhysics.raycast_2d: 成功检测到碰撞阻挡！', 'danger');
              "><i class="fa-solid fa-crosshairs"></i> 触发正向射线检测 (Hit Obstacle)</button>

              <button class="g-btn g-btn-default" onclick="
                const tag = document.getElementById('simRaycastResultTag');
                const laser = document.getElementById('simLaserRay');
                const hit = document.getElementById('simHitPoint');
                laser.style.width = '320px';
                laser.style.background = 'linear-gradient(90deg, #409eff, #67c23a)';
                hit.style.display = 'none';
                tag.className = 'g-tag g-tag-success';
                tag.innerText = '空旷无阻挡 (No Hit, Range: 320px)';
                showToast('GPhysics.raycast_2d: 前方无遮挡，视线通畅！', 'success');
              "><i class="fa-solid fa-eye"></i> 偏转角度检测 (Clear View)</button>
            </div>
          </div>
        `,
        code: `# =========================================================================
# Godot 4.x 纯代码程序化物理与直接空间状态查询实战 (GDScript 4.x)
# =========================================================================
extends CharacterBody2D

# 1. 在 _physics_process 中进行纯代码直接空间射线探测 (无场景节点开销)
func _physics_process(delta: float) -> void:
    var space_state = get_world_2d().direct_space_state
    
    # 构造射线检测参数 (从玩家当前位置向正前方发射 200 像素)
    var from_pos = global_position
    var to_pos = from_pos + transform.x * 200.0
    
    var query = PhysicsRayQueryParameters2D.create(from_pos, to_pos)
    query.collision_mask = GPhysics.to_mask([1, 2]) # 仅检测第 1 层(地形)与第 2 层(敌人)
    query.exclude = [get_rid()] # 排除自身 RID
    
    var result: Dictionary = space_state.intersect_ray(query)
    if not result.is_empty():
        var hit_collider = result.collider
        var hit_position = result.position
        var hit_normal = result.normal
        # 视线被阻挡，触发反弹或命中敌人
        print("射线命中: %s, 碰撞点: %v, 法线: %v" % [hit_collider.name, hit_position, hit_normal])

# 2. 纯代码为 NPC 或掉落物动态附加碰撞体
func create_dynamic_pickup_item(item_data: Dictionary, spawn_pos: Vector2) -> Area2D:
    var area = Area2D.new()
    area.global_position = spawn_pos
    
    # 使用 GPhysics 动态挂载圆形碰撞体 (半径 16px)
    var col = GPhysics.attach_circle_collider_2d(area, 16.0)
    
    # 监听进入事件
    area.body_entered.connect(func(body):
        if body.is_in_group("player"):
            GMessage.success("拾取到道具: %s" % item_data.name)
            area.queue_free()
    )
    get_parent().add_child(area)
    return area`
      }
    ]
  },

  // --------------------------------------------------------
  // 14.6 CharacterBody 运动学与 RigidBody 刚体动力学
  // --------------------------------------------------------
  'phys-character-rigidbody': {
    title: '🏃 CharacterBody 运动学公式与 RigidBody 刚体爆炸力学',
    desc: '封装 Godot 4.x 平台跳跃手感公式（由期望跳跃高度与滞空时间反推初速度和重力加速度）以及刚体动力学（径向衰减范围爆炸冲击波 apply_central_impulse、碰撞反弹力学与物理材质配置）。',
    demos: [
      {
        title: '1. 平台跳跃力学公式计算器 (Jump Velocity & Gravity Solver)',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:14px; color:var(--primary);">🦘 纯数学精准跳跃手感反推器 (v = 2h/t, g = 2h/t²)</span>
              <span class="g-tag g-tag-success">无物理手感玄学</span>
            </div>

            <!-- Jump Params Control Grid -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; background:var(--bg-card); border:1px solid var(--border-base); border-radius:var(--radius); padding:16px;">
              <div>
                <label style="font-size:12px; color:var(--text-secondary); display:block; margin-bottom:4px;">期望最大跳跃高度 (jump_height: 像素)</label>
                <input type="number" id="simJumpH" class="g-input" value="120" style="width:100%; height:32px;" oninput="
                  const h = parseFloat(this.value) || 120;
                  const t = parseFloat(document.getElementById('simJumpT').value) || 0.4;
                  const v = (2 * h) / t;
                  const g = (2 * h) / (t * t);
                  document.getElementById('simResV').innerText = '-' + v.toFixed(1) + ' px/s';
                  document.getElementById('simResG').innerText = g.toFixed(1) + ' px/s²';
                ">
              </div>
              <div>
                <label style="font-size:12px; color:var(--text-secondary); display:block; margin-bottom:4px;">到达最高点时间 (time_to_peak: 秒)</label>
                <input type="number" step="0.05" id="simJumpT" class="g-input" value="0.38" style="width:100%; height:32px;" oninput="
                  const t = parseFloat(this.value) || 0.38;
                  const h = parseFloat(document.getElementById('simJumpH').value) || 120;
                  const v = (2 * h) / t;
                  const g = (2 * h) / (t * t);
                  document.getElementById('simResV').innerText = '-' + v.toFixed(1) + ' px/s';
                  document.getElementById('simResG').innerText = g.toFixed(1) + ' px/s²';
                ">
              </div>
            </div>

            <!-- Output Calculation Results -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
              <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--primary); border-radius:var(--radius); text-align:center;">
                <div style="font-size:11px; color:var(--primary); font-weight:700;">计算所得跳跃初速度 (JUMP_VELOCITY)</div>
                <div id="simResV" style="font-size:1.4rem; font-weight:800; color:var(--primary); margin-top:2px;">-631.6 px/s</div>
              </div>
              <div style="padding:12px; background:var(--bg-surface); border:1px solid var(--warning); border-radius:var(--radius); text-align:center;">
                <div style="font-size:11px; color:var(--warning); font-weight:700;">计算所得重力加速度 (GRAVITY)</div>
                <div id="simResG" style="font-size:1.4rem; font-weight:800; color:var(--warning); margin-top:2px;">1662.0 px/s²</div>
              </div>
            </div>

            <!-- Explosion Impulse Simulator -->
            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-base); padding-top:12px;">
              <span style="font-size:12px; color:var(--text-secondary);">💣 范围爆炸冲量 (Explosion Impulse)</span>
              <button class="g-btn g-btn-danger" style="height:30px; font-size:12px;" onclick="
                showToast('GPhysics.apply_explosion_impulse_2d: 爆炸半径 200px 内 6 个刚体受冲击散开！', 'danger');
              "><i class="fa-solid fa-burst"></i> 引爆手榴弹冲击波</button>
            </div>
          </div>
        `,
        code: `# =========================================================================
# CharacterBody2D 极佳跳跃手感公式 + 刚体范围爆炸力学 (GDScript 4.x)
# =========================================================================
extends CharacterBody2D

# 设定直观的游戏参数 (无需凭感觉盲调数字)
@export var jump_height: float = 120.0     # 角色能跳过 120 像素高的障碍
@export var time_to_peak: float = 0.38     # 0.38 秒到达最高点 (手感干脆利落)
@export var move_speed: float = 240.0

var jump_velocity: float
var gravity: float

func _ready() -> void:
    # 自动精准求解初速度与重力
    jump_velocity = GPhysics.calculate_jump_velocity(jump_height, time_to_peak)
    gravity = GPhysics.calculate_gravity(jump_height, time_to_peak)

func _physics_process(delta: float) -> void:
    # 施加重力
    if not is_on_floor():
        velocity.y += gravity * delta
        
    # 处理跳跃按键
    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = jump_velocity
        
    # 水平移动
    var dir = Input.get_axis("ui_left", "ui_right")
    velocity.x = dir * move_speed
    
    move_and_slide()

# 投掷手榴弹：对周围刚体产生距离衰减的冲击力
func throw_grenade(explode_pos: Vector2) -> void:
    var affected = GPhysics.apply_explosion_impulse_2d(self, explode_pos, 200.0, 850.0)
    print("爆炸波及了 %d 个刚体对象！" % affected)`
      }
    ]
  },

  // --------------------------------------------------------
  // 14.7 Area2D / 3D 区域触发器与碰撞形状
  // --------------------------------------------------------
  'phys-area-collision': {
    title: '📦 Area2D 触发器、重力场与 2D/3D 碰撞形状 (Collision Shapes)',
    desc: '详解 Area2D/Area3D 核心机制：重力点汇聚（黑洞吸引力）、风力/液体阻尼场、拾取物区域检测，以及 Rectangle、Circle、Capsule、Convex/Concave 多边形碰撞形状的快速构造与位掩码过滤。',
    demos: [
      {
        title: '1. Area2D 拾取检测与点重力场 (Point Gravity / Attractor)',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-primary" onclick="showToast('Area2D body_entered: 玩家进入战利品金币吸引范围，金币自动被吸附！', 'success')">
                <i class="fa-solid fa-magnet"></i> 模拟金币磁力吸附场 (Point Gravity)
              </button>
              <button class="g-btn g-btn-warning" onclick="showToast('Area2D area_entered: 触发刺针机关，受到 35 点穿刺伤害！', 'warning')">
                <i class="fa-solid fa-triangle-exclamation"></i> 模拟伤害陷阱区域 (Trap Area)
              </button>
              <button class="g-btn g-btn-info" onclick="showToast('Area2D linear_damp = 8.0: 进入水下/泥浆区域，移动速度与阻尼自动减缓！', 'info')">
                <i class="fa-solid fa-water"></i> 模拟水体减速阻尼场 (Damping Field)
              </button>
            </div>
            <div style="font-size:12px; color:var(--text-secondary); line-height:1.6;">
              💡 <strong>Area 物理场特性</strong>：通过勾选 <code>gravity_space_override = SPACE_OVERRIDE_COMBINE</code>，无需写任何物理受力代码，即可由引擎底层自动产生黑洞吸力、龙卷风升力或水体浮力！
            </div>
          </div>
        `,
        code: `# =========================================================================
# Area2D 黑洞点重力吸引场与拾取判定实战 (GDScript 4.x)
# =========================================================================
extends Area2D

func _ready() -> void:
    # 1. 开启点重力场 (黑洞吸力效果)
    gravity_space_override = Area2D.SPACE_OVERRIDE_COMBINE
    gravity_point = true
    gravity_point_unit_distance = 64.0
    gravity_point_center = Vector2.ZERO
    gravity = 1200.0 # 强大向心吸附力
    
    # 2. 动态挂载圆形吸引半径 (180px)
    GPhysics.attach_circle_collider_2d(self, 180.0)
    
    # 3. 监听玩家接触
    body_entered.connect(func(body):
        if body.is_in_group("player"):
            GMessage.warning("警告：已被卷入暗影重力黑洞！")
    )`
      }
    ]
  },

  // --------------------------------------------------------
  // 14.8 GCoord 2D 游戏坐标系转换与向量几何计算
  // --------------------------------------------------------
  'phys-coord-transforms': {
    title: '📐 GCoord: 2D 游戏全能坐标系与向量几何计算 (Screen / World / Isometric / FoV)',
    desc: '专为 2D 游戏量身打造的高频坐标与数学工具库：2D 世界坐标转屏幕画布、屏幕外目标边缘箭头指示器 (Off-Screen Indicator)、2.5D 等轴测斜视角 (Isometric 45°) 转换、战利品开箱拱形抛物线 (Bezier Arc)、圆周环绕法球点阵以及 2D 扇形锥体视线探测 (FoV Cone Check)。',
    demos: [
      {
        title: '1. 2D 屏幕外目标边缘指示箭头模拟器 (Off-Screen Target Pointer)',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:14px; color:var(--primary);">🎯 屏幕边缘夹紧指示器 (在屏幕边缘显示指向目标的旋转箭头与距离)</span>
              <span id="simOffscreenTag" class="g-tag g-tag-danger">目标在屏幕右外侧 (Off-Screen)</span>
            </div>

            <!-- Screen Viewport Box -->
            <div style="position:relative; height:180px; background:#070b14; border:2px dashed #409eff; border-radius:var(--radius); overflow:hidden;">
              <div style="position:absolute; top:8px; left:8px; font-size:10px; color:#409eff; font-weight:700;">📺 2D 主摄像机屏幕视口范围 (Viewport Bounds)</div>
              
              <!-- Player Center -->
              <div style="position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); display:flex; flex-direction:column; align-items:center;">
                <div style="font-size:28px;">🧙‍♂️</div>
                <span style="font-size:10px; color:#fff; font-weight:700;">玩家 (屏幕中心)</span>
              </div>

              <!-- Edge Indicator Pointer -->
              <div id="simEdgePointer" style="position:absolute; right:12px; top:50%; transform:translateY(-50%); background:#ff4d4f; color:#fff; padding:4px 10px; border-radius:14px; font-size:11px; font-weight:800; display:flex; align-items:center; gap:6px; box-shadow:0 0 12px #ff4d4f; transition:all 0.3s ease;">
                <span>👹 领主 (640m)</span>
                <span style="font-size:14px;">➔</span>
              </div>
            </div>

            <!-- Controls -->
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-primary" onclick="
                const ptr = document.getElementById('simEdgePointer');
                const tag = document.getElementById('simOffscreenTag');
                ptr.style.right = '12px';
                ptr.style.top = '50%';
                ptr.style.left = 'auto';
                ptr.style.bottom = 'auto';
                ptr.innerHTML = '<span>👹 右侧领主 (640m)</span> <span>➔</span>';
                tag.className = 'g-tag g-tag-danger';
                tag.innerText = '目标在屏幕右外侧 (Off-Screen Right)';
                showToast('GCoord.get_offscreen_indicator_2d: 箭头已吸附至右侧屏幕边缘', 'info');
              "><i class="fa-solid fa-arrow-right"></i> 目标在屏幕右侧远处</button>

              <button class="g-btn g-btn-warning" onclick="
                const ptr = document.getElementById('simEdgePointer');
                const tag = document.getElementById('simOffscreenTag');
                ptr.style.right = 'auto';
                ptr.style.top = '12px';
                ptr.style.left = '50%';
                ptr.style.bottom = 'auto';
                ptr.innerHTML = '<span>⬆️ 北方传送门 (820m)</span>';
                tag.className = 'g-tag g-tag-warning';
                tag.innerText = '目标在屏幕上方外侧 (Off-Screen Top)';
                showToast('GCoord.get_offscreen_indicator_2d: 箭头已吸附至顶部屏幕边缘', 'warning');
              "><i class="fa-solid fa-arrow-up"></i> 目标在屏幕上方远处</button>

              <button class="g-btn g-btn-success" onclick="
                const ptr = document.getElementById('simEdgePointer');
                const tag = document.getElementById('simOffscreenTag');
                ptr.style.right = 'auto';
                ptr.style.left = '75%';
                ptr.style.top = '40%';
                ptr.innerHTML = '<span>🎯 视野内目标 (直接显示)</span>';
                tag.className = 'g-tag g-tag-success';
                tag.innerText = '目标已进入屏幕视口 (In-Screen)';
                showToast('GCoord.get_offscreen_indicator_2d: 目标在屏幕内，is_on_screen = true', 'success');
              "><i class="fa-solid fa-eye"></i> 目标在屏幕内</button>
            </div>
          </div>
        `,
        code: `# =========================================================================
# 2D 屏幕外目标指示器 (Off-Screen Indicator) 实战 (GDScript 4.x)
# =========================================================================
extends Control

@export var target_boss: Node2D
@onready var indicator_arrow: Control = $IndicatorArrow
@onready var distance_label: Label = $IndicatorArrow/DistLabel

func _process(delta: float) -> void:
    if not is_instance_valid(target_boss):
        indicator_arrow.visible = false
        return
        
    # 计算目标相对于屏幕边缘的夹紧坐标与方向角
    var info = GCoord.get_offscreen_indicator_2d(self, target_boss.global_position, 36.0)
    
    if info.is_on_screen:
        # 目标在屏幕内部时隐藏边缘指示箭头
        indicator_arrow.visible = false
    else:
        # 目标在屏幕外时显示红色边缘箭头，并旋转指向目标方向
        indicator_arrow.visible = true
        indicator_arrow.position = info.screen_pos
        indicator_arrow.rotation = info.angle
        distance_label.text = "%dm" % int(info.distance / 10.0)`
      },
      {
        title: '2. 2.5D 等轴测 (Isometric 45°) 与直角坐标双向转换',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:14px; color:var(--primary);">🗺️ 2.5D 斜视角 (Isometric) 坐标互转计算器</span>
              <span class="g-tag g-tag-primary">X_iso = x - y, Y_iso = (x + y)/2</span>
            </div>
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; background:var(--bg-card); padding:14px; border-radius:var(--radius); border:1px solid var(--border-base);">
              <div>
                <label style="font-size:12px; color:var(--text-secondary);">输入直角坐标 (Cartesian X, Y):</label>
                <div style="display:flex; gap:8px; margin-top:4px;">
                  <input type="number" id="simCartX" class="g-input" value="100" style="width:50%; height:32px;" placeholder="X">
                  <input type="number" id="simCartY" class="g-input" value="60" style="width:50%; height:32px;" placeholder="Y">
                </div>
              </div>
              <div>
                <label style="font-size:12px; color:var(--text-secondary);">计算所得 2.5D 等轴测坐标 (Isometric):</label>
                <div id="simIsoRes" style="font-size:15px; font-weight:800; color:#409eff; height:32px; display:flex; align-items:center; margin-top:4px;">
                  Vector2(40.0, 80.0)
                </div>
              </div>
            </div>

            <button class="g-btn g-btn-primary" style="height:32px;" onclick="
              const x = parseFloat(document.getElementById('simCartX').value) || 0;
              const y = parseFloat(document.getElementById('simCartY').value) || 0;
              const isoX = x - y;
              const isoY = (x + y) * 0.5;
              document.getElementById('simIsoRes').innerText = 'Vector2(' + isoX.toFixed(1) + ', ' + isoY.toFixed(1) + ')';
              showToast('GCoord.cartesian_to_isometric_2d 计算完成！', 'success');
            "><i class="fa-solid fa-calculator"></i> 转换坐标</button>
          </div>
        `,
        code: `# =========================================================================
# 2.5D 等轴测斜视角 (Isometric) 坐标互转实战 (GDScript 4.x)
# =========================================================================

# 1. 将直角笛卡尔世界位置转为 45° 等轴测渲染位置
var iso_pos = GCoord.cartesian_to_isometric_2d(Vector2(100, 60)) # => Vector2(40, 80)

# 2. 将鼠标点击的等轴测位置还原为直角坐标
var cart_pos = GCoord.isometric_to_cartesian_2d(iso_pos) # => Vector2(100, 60)`
      },
      {
        title: '3. 战利品开箱拱形抛物线 (Bezier Arc) 与法球环绕点阵 (Orbit Points)',
        render: `
          <div style="background:var(--bg-surface); padding:20px; border-radius:var(--radius-lg); border:1px solid var(--border-base); display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; font-size:14px; color:var(--primary);">✨ 宝箱金币爆出抛物线 & 角色环绕护盾点阵</span>
              <span class="g-tag g-tag-warning">贝塞尔曲线 / 极坐标</span>
            </div>

            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="g-btn g-btn-warning" onclick="
                showToast('GCoord.get_loot_arc_pos_2d: 成功生成 8 枚金币向上拱起抛物线掉落动画轨迹！', 'warning');
              "><i class="fa-solid fa-coins"></i> 模拟金币爆出优雅抛物线 (Bezier Loot Arc)</button>

              <button class="g-btn g-btn-info" onclick="
                showToast('GCoord.get_orbit_points_2d: 已计算角色周围 6 颗旋转冰霜法球的环绕坐标点阵！', 'info');
              "><i class="fa-solid fa-circle-nodes"></i> 模拟生成 6 个环绕法球点阵 (Orbit Points)</button>

              <button class="g-btn g-btn-success" onclick="
                showToast('GCoord.is_in_fov_cone_2d: 检测敌人处于前方 90 度扇形近战攻击范围内，判定命中！', 'success');
              "><i class="fa-solid fa-bullseye"></i> 模拟 2D 扇形攻击判定 (FoV Cone)</button>
            </div>
          </div>
        `,
        code: `# =========================================================================
# 战利品掉落抛物线 + 环绕法球点阵 + 扇形视线判定 (GDScript 4.x)
# =========================================================================

# 1. 宝箱开箱：让掉落物沿二次贝塞尔曲线优雅向上拱起落地
func spawn_loot_drop(start_pos: Vector2, land_pos: Vector2) -> void:
    var loot = preload("res://scenes/gem.tscn").instantiate()
    get_parent().add_child(loot)
    
    var tween = create_tween()
    tween.tween_method(func(t: float):
        # arc_height = 80 像素 (向上拱起的最大高度)
        loot.global_position = GCoord.get_loot_arc_pos_2d(start_pos, land_pos, 80.0, t)
    , 0.0, 1.0, 0.6).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_OUT)

# 2. 环绕法球：在角色周围均匀生成 4 颗旋转法球
func update_orbiting_shields(delta: float) -> void:
    orbit_angle += delta * 2.0 # 旋转速度
    var orbit_points = GCoord.get_orbit_points_2d(global_position, 64.0, 4, orbit_angle)
    for i in range(4):
        shields[i].global_position = orbit_points[i]

# 3. 扇形近战攻击：判定目标是否在角色正前方 90 度扇形内
func check_melee_cleave(target_enemy: Node2D) -> bool:
    var forward = Vector2.RIGHT.rotated(rotation)
    return GCoord.is_in_fov_cone_2d(global_position, forward, target_enemy.global_position, 120.0, 90.0)`
      }
    ]
  }
};


