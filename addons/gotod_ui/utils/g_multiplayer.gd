# =========================================================================
# GMultiplayer: Godot 4.x 高级多人联机与 RPC 房主/客户端网络管理器
# 封装 ENetMultiplayerPeer 创建房间、加入房间、Peer 事件与 RPC 广播
# =========================================================================
@tool
class_name GMultiplayer
extends Node

signal server_created(port: int)
signal joined_server(address: String, port: int)
signal connection_failed()
signal server_disconnected()
signal peer_connected(id: int)
signal peer_disconnected(id: int)

@export var default_port: int = 8910
@export var max_clients: int = 16

var _peer: ENetMultiplayerPeer

func _ready() -> void:
	if multiplayer:
		multiplayer.peer_connected.connect(_on_peer_connected)
		multiplayer.peer_disconnected.connect(_on_peer_disconnected)
		multiplayer.connected_to_server.connect(_on_connected_to_server)
		multiplayer.connection_failed.connect(_on_connection_failed)
		multiplayer.server_disconnected.connect(_on_server_disconnected)

## 启动作为房主 Host / 独立服务器 Server
func create_server(port: int = 0, max_players: int = 0) -> Error:
	var final_port = port if port > 0 else default_port
	var final_max = max_players if max_players > 0 else max_clients
	
	_peer = ENetMultiplayerPeer.new()
	var err = _peer.create_server(final_port, final_max)
	if err != OK:
		return err
		
	multiplayer.multiplayer_peer = _peer
	server_created.emit(final_port)
	return OK

## 作为客户端加入目标服务器
func join_server(address: String = "127.0.0.1", port: int = 0) -> Error:
	var final_port = port if port > 0 else default_port
	
	_peer = ENetMultiplayerPeer.new()
	var err = _peer.create_client(address, final_port)
	if err != OK:
		return err
		
	multiplayer.multiplayer_peer = _peer
	return OK

## 断开当前联机网络
func disconnect_network() -> void:
	if _peer:
		_peer.close()
	if multiplayer:
		multiplayer.multiplayer_peer = null

## 获取本地 Peer ID (服务器恒为 1)
func get_unique_id() -> int:
	return multiplayer.get_unique_id() if multiplayer else 1

## 是否为服务器 / 房主 (Host)
func is_server() -> bool:
	return multiplayer.is_server() if multiplayer else false

## 获取当前所有已连接的玩家 Peer ID 列表
func get_peers() -> PackedInt32Array:
	return multiplayer.get_peers() if multiplayer else PackedInt32Array()

func _on_peer_connected(id: int) -> void:
	peer_connected.emit(id)

func _on_peer_disconnected(id: int) -> void:
	peer_disconnected.emit(id)

func _on_connected_to_server() -> void:
	var port = default_port
	joined_server.emit("Connected", port)

func _on_connection_failed() -> void:
	connection_failed.emit()

func _on_server_disconnected() -> void:
	server_disconnected.emit()
