# =========================================================================
# GWebSocket: Godot 4.x 现代化 WebSocket 实时长连接客户端
# 支持自动心跳保活、断线重连、JSON/文本传输与事件信号分发
# =========================================================================
@tool
class_name GWebSocket
extends Node

signal connected_to_server()
signal disconnected_from_server(code: int, reason: String)
signal message_received(message: String)
signal json_received(json_data: Variant)
signal binary_received(bytes: PackedByteArray)
signal connection_error(message: String)

@export var server_url: String = "ws://localhost:8080"
@export var auto_reconnect: bool = true
@export var reconnect_interval: float = 3.0
@export var heartbeat_interval: float = 15.0
@export var heartbeat_payload: String = '{"type":"ping"}'

var _peer: WebSocketPeer = WebSocketPeer.new()
var _state: int = WebSocketPeer.STATE_CLOSED
var _reconnect_timer: float = 0.0
var _heartbeat_timer: float = 0.0
var _is_manual_close: bool = false

func _ready() -> void:
	set_process(false)

func connect_to_url(url: String = "") -> Error:
	if not url.is_empty():
		server_url = url
	_is_manual_close = false
	
	_peer = WebSocketPeer.new()
	var err = _peer.connect_to_url(server_url)
	if err != OK:
		connection_error.emit("Failed to initiate connection: %d" % err)
		if auto_reconnect:
			_reconnect_timer = reconnect_interval
		return err
	
	_state = _peer.get_ready_state()
	set_process(true)
	return OK

func send_text(text: String) -> Error:
	if _peer.get_ready_state() != WebSocketPeer.STATE_OPEN:
		return ERR_UNCONFIGURED
	return _peer.send_text(text)

func send_json(data: Variant) -> Error:
	return send_text(JSON.stringify(data))

func send_binary(bytes: PackedByteArray) -> Error:
	if _peer.get_ready_state() != WebSocketPeer.STATE_OPEN:
		return ERR_UNCONFIGURED
	return _peer.send(bytes)

func close_connection(code: int = 1000, reason: String = "Normal closure") -> void:
	_is_manual_close = true
	if _peer:
		_peer.close(code, reason)
	_state = WebSocketPeer.STATE_CLOSED
	set_process(false)

func is_connected_to_server() -> bool:
	return _peer and _peer.get_ready_state() == WebSocketPeer.STATE_OPEN

func _process(delta: float) -> void:
	if not _peer:
		return
		
	_peer.poll()
	var current_state = _peer.get_ready_state()
	
	if _state != current_state:
		_state = current_state
		if _state == WebSocketPeer.STATE_OPEN:
			_heartbeat_timer = 0.0
			connected_to_server.emit()
		elif _state == WebSocketPeer.STATE_CLOSED:
			var code = _peer.get_close_code()
			var reason = _peer.get_close_reason()
			disconnected_from_server.emit(code, reason)
			if auto_reconnect and not _is_manual_close:
				_reconnect_timer = reconnect_interval
	
	# Handle incoming packet messages
	if _state == WebSocketPeer.STATE_OPEN:
		while _peer.get_available_packet_count() > 0:
			var pkt = _peer.get_packet()
			if _peer.was_string_packet():
				var text = pkt.get_string_from_utf8()
				message_received.emit(text)
				var json = JSON.new()
				if json.parse(text) == OK:
					json_received.emit(json.data)
			else:
				binary_received.emit(pkt)
				
		# Heartbeat ping
		if heartbeat_interval > 0.0:
			_heartbeat_timer += delta
			if _heartbeat_timer >= heartbeat_interval:
				_heartbeat_timer = 0.0
				if not heartbeat_payload.is_empty():
					send_text(heartbeat_payload)
					
	elif _state == WebSocketPeer.STATE_CLOSED:
		if auto_reconnect and not _is_manual_close:
			_reconnect_timer -= delta
			if _reconnect_timer <= 0.0:
				_reconnect_timer = reconnect_interval
				connect_to_url()
