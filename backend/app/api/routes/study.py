from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
from app.database import get_db
from app.models.user import User
from app.models.study import Flashcard, StudySession
from app.schemas.study import FlashcardCreate, FlashcardGenerate, FlashcardResponse, FlashcardReview, StudySessionCreate, StudySessionResponse
from app.core.dependencies import get_current_user

router = APIRouter()


@router.post("/flashcards/generate", response_model=List[FlashcardResponse])
async def generate_flashcards(
    data: FlashcardGenerate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Generate flashcards using AI"""
    # In production, this would call AI service
    # For now, creating demo flashcards
    flashcards = []
    for i in range(min(data.count, 10)):
        flashcard = Flashcard(
            user_id=current_user.id,
            deck_name=data.topic,
            question=f"Question {i+1} about {data.topic}?",
            answer=f"Answer {i+1} about {data.topic}",
            difficulty=data.difficulty,
            source="ai-generated"
        )
        db.add(flashcard)
        flashcards.append(flashcard)
    
    db.commit()
    for card in flashcards:
        db.refresh(card)
    
    return flashcards


@router.post("/flashcards", response_model=FlashcardResponse, status_code=status.HTTP_201_CREATED)
async def create_flashcard(
    flashcard_data: FlashcardCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a manual flashcard"""
    flashcard = Flashcard(
        user_id=current_user.id,
        question=flashcard_data.question,
        answer=flashcard_data.answer,
        deck_name=flashcard_data.deck_name,
        difficulty=flashcard_data.difficulty,
        tags=flashcard_data.tags,
        source="manual"
    )
    db.add(flashcard)
    db.commit()
    db.refresh(flashcard)
    return flashcard


@router.get("/flashcards", response_model=List[FlashcardResponse])
async def get_flashcards(
    deck_name: str = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all flashcards"""
    query = db.query(Flashcard).filter(Flashcard.user_id == current_user.id)
    
    if deck_name:
        query = query.filter(Flashcard.deck_name == deck_name)
    
    flashcards = query.order_by(Flashcard.created_at.desc()).all()
    return flashcards


@router.get("/flashcards/due", response_model=List[FlashcardResponse])
async def get_due_flashcards(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get flashcards due for review"""
    now = datetime.utcnow()
    flashcards = db.query(Flashcard).filter(
        Flashcard.user_id == current_user.id,
        Flashcard.next_review <= now
    ).all()
    return flashcards


@router.post("/flashcards/{flashcard_id}/review", response_model=FlashcardResponse)
async def review_flashcard(
    flashcard_id: int,
    review_data: FlashcardReview,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Review a flashcard (SM-2 algorithm)"""
    flashcard = db.query(Flashcard).filter(
        Flashcard.id == flashcard_id,
        Flashcard.user_id == current_user.id
    ).first()
    
    if not flashcard:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Flashcard not found"
        )
    
    # SM-2 Algorithm
    quality = review_data.quality
    flashcard.times_reviewed += 1
    
    if quality >= 3:
        flashcard.times_correct += 1
        
        if flashcard.repetitions == 0:
            flashcard.interval = 1
        elif flashcard.repetitions == 1:
            flashcard.interval = 6
        else:
            flashcard.interval = int(flashcard.interval * flashcard.easiness_factor)
        
        flashcard.repetitions += 1
    else:
        flashcard.repetitions = 0
        flashcard.interval = 1
    
    # Update easiness factor
    flashcard.easiness_factor = max(1.3, flashcard.easiness_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))
    
    # Set next review date
    flashcard.next_review = datetime.utcnow() + timedelta(days=flashcard.interval)
    
    db.commit()
    db.refresh(flashcard)
    return flashcard


@router.post("/sessions", response_model=StudySessionResponse, status_code=status.HTTP_201_CREATED)
async def create_study_session(
    session_data: StudySessionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a study session"""
    session = StudySession(
        user_id=current_user.id,
        mode=session_data.mode,
        deck_name=session_data.deck_name
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    return session


@router.get("/sessions", response_model=List[StudySessionResponse])
async def get_study_sessions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get study sessions"""
    sessions = db.query(StudySession).filter(
        StudySession.user_id == current_user.id
    ).order_by(StudySession.started_at.desc()).limit(20).all()
    return sessions
