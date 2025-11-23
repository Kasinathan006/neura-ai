from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class MessageCreate(BaseModel):
    content: str
    ai_model: Optional[str] = "gpt-4"
    mode: Optional[str] = "chat"


class MessageResponse(BaseModel):
    id: int
    conversation_id: int
    role: str
    content: str
    ai_model: Optional[str]
    tokens_used: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class ConversationCreate(BaseModel):
    title: Optional[str] = "New Conversation"
    mode: Optional[str] = "chat"


class ConversationResponse(BaseModel):
    id: int
    user_id: int
    title: str
    mode: str
    is_pinned: bool
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True


class ConversationWithMessages(ConversationResponse):
    messages: List[MessageResponse] = []
