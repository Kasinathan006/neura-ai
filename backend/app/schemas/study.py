from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class FlashcardCreate(BaseModel):
    question: str
    answer: str
    deck_name: Optional[str] = "General"
    difficulty: Optional[str] = "medium"
    tags: Optional[List[str]] = []


class FlashcardGenerate(BaseModel):
    topic: str
    count: Optional[int] = 10
    difficulty: Optional[str] = "medium"


class FlashcardResponse(BaseModel):
    id: int
    user_id: int
    deck_name: str
    question: str
    answer: str
    difficulty: str
    easiness_factor: float
    interval: int
    repetitions: int
    next_review: Optional[datetime]
    times_reviewed: int
    times_correct: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class FlashcardReview(BaseModel):
    quality: int  # 0-5 (SM-2 algorithm)


class StudySessionCreate(BaseModel):
    mode: Optional[str] = "review"
    deck_name: Optional[str] = None


class StudySessionResponse(BaseModel):
    id: int
    user_id: int
    mode: str
    deck_name: Optional[str]
    cards_studied: int
    correct_answers: int
    incorrect_answers: int
    duration_minutes: int
    started_at: datetime
    ended_at: Optional[datetime]
    
    class Config:
        from_attributes = True
