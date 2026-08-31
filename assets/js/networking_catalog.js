// =========================================================================
// Gotod Components UI - Networking & Multiplayer Catalog
// =========================================================================
window.NETWORKING_CATALOG = {
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
};
