from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
from app.database import get_db
from app.models.user import User
from app.models.reminder import Reminder
from app.core.dependencies import get_current_user
from pydantic import BaseModel


class ReminderCreate(BaseModel):
    title: str
    description: str = None
    time_expression: str


class ReminderResponse(BaseModel):
    id: int
    user_id: int
    title: str
    description: str = None
    time_expression: str
    scheduled_time: datetime
    is_completed: bool
    is_recurring: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


router = APIRouter()


def parse_time_expression(expression: str) -> datetime:
    """Parse natural language time expression"""
    # Simplified parser - in production, use a library like dateparser
    expression = expression.lower().strip()
    now = datetime.utcnow()
    
    if "in" in expression:
        if "minute" in expression:
            minutes = int(''.join(filter(str.isdigit, expression)))
            return now + timedelta(minutes=minutes)
        elif "hour" in expression:
            hours = int(''.join(filter(str.isdigit, expression)))
            return now + timedelta(hours=hours)
        elif "day" in expression:
            days = int(''.join(filter(str.isdigit, expression)))
            return now + timedelta(days=days)
    
    elif "tomorrow" in expression:
        return now + timedelta(days=1)
    
    # Default to 1 hour from now
    return now + timedelta(hours=1)


@router.post("/create", response_model=ReminderResponse, status_code=status.HTTP_201_CREATED)
async def create_reminder(
    reminder_data: ReminderCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a reminder"""
    scheduled_time = parse_time_expression(reminder_data.time_expression)
    
    reminder = Reminder(
        user_id=current_user.id,
        title=reminder_data.title,
        description=reminder_data.description,
        time_expression=reminder_data.time_expression,
        scheduled_time=scheduled_time
    )
    db.add(reminder)
    db.commit()
    db.refresh(reminder)
    return reminder


@router.get("/", response_model=List[ReminderResponse])
async def get_reminders(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all reminders"""
    reminders = db.query(Reminder).filter(
        Reminder.user_id == current_user.id,
        Reminder.is_completed == False
    ).order_by(Reminder.scheduled_time).all()
    return reminders


@router.get("/due", response_model=List[ReminderResponse])
async def get_due_reminders(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get due reminders"""
    now = datetime.utcnow()
    reminders = db.query(Reminder).filter(
        Reminder.user_id == current_user.id,
        Reminder.scheduled_time <= now,
        Reminder.is_completed == False
    ).all()
    return reminders


@router.patch("/{reminder_id}/complete", response_model=ReminderResponse)
async def complete_reminder(
    reminder_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Mark reminder as completed"""
    reminder = db.query(Reminder).filter(
        Reminder.id == reminder_id,
        Reminder.user_id == current_user.id
    ).first()
    
    if not reminder:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reminder not found"
        )
    
    reminder.is_completed = True
    reminder.completed_at = datetime.utcnow()
    db.commit()
    db.refresh(reminder)
    return reminder


@router.delete("/{reminder_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_reminder(
    reminder_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a reminder"""
    reminder = db.query(Reminder).filter(
        Reminder.id == reminder_id,
        Reminder.user_id == current_user.id
    ).first()
    
    if not reminder:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reminder not found"
        )
    
    db.delete(reminder)
    db.commit()
    return None
