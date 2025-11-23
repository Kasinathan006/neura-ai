from fastapi import WebSocket, WebSocketDisconnect
from typing import Dict
import json


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, WebSocket] = {}
    
    async def connect(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        self.active_connections[user_id] = websocket
    
    def disconnect(self, user_id: int):
        if user_id in self.active_connections:
            del self.active_connections[user_id]
    
    async def send_personal_message(self, message: str, user_id: int):
        if user_id in self.active_connections:
            await self.active_connections[user_id].send_text(message)
    
    async def broadcast(self, message: str):
        for connection in self.active_connections.values():
            await connection.send_text(message)


manager = ConnectionManager()


async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time chat"""
    # For demo, using user_id = 1
    user_id = 1
    
    await manager.connect(websocket, user_id)
    
    try:
        while True:
            # Receive message from client
            data = await websocket.receive_text()
            message_data = json.loads(data)
            
            # Echo back user message
            await manager.send_personal_message(
                json.dumps({
                    "type": "message",
                    "role": "user",
                    "content": message_data.get("message", ""),
                    "created_at": "2025-11-23T00:00:00Z"
                }),
                user_id
            )
            
            # Send typing indicator
            await manager.send_personal_message(
                json.dumps({"type": "typing", "isTyping": True}),
                user_id
            )
            
            # Simulate AI processing
            import asyncio
            await asyncio.sleep(1)
            
            # Send AI response
            ai_response = f"This is a demo WebSocket response to: {message_data.get('message', '')}"
            await manager.send_personal_message(
                json.dumps({
                    "type": "message",
                    "role": "assistant",
                    "content": ai_response,
                    "ai_model": message_data.get("ai_model", "gpt-4"),
                    "created_at": "2025-11-23T00:00:00Z"
                }),
                user_id
            )
            
            # Stop typing
            await manager.send_personal_message(
                json.dumps({"type": "typing", "isTyping": False}),
                user_id
            )
            
    except WebSocketDisconnect:
        manager.disconnect(user_id)
    except Exception as e:
        print(f"WebSocket error: {e}")
        manager.disconnect(user_id)
