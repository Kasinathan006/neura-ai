from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os

from app.config import settings
from app.database import engine, Base
from app.redis_client import get_redis, close_redis
from app.api.routes import auth, chat, study, voice, reminders
from app.api import websocket


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    # Startup
    print("🚀 Starting NEURA AI Backend...")
    
    # Create database tables
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created")
    
    # Initialize Redis
    await get_redis()
    print("✅ Redis connected")
    
    # Create uploads directory
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    print("✅ Upload directory ready")
    
    print(f"🎉 {settings.APP_NAME} v{settings.APP_VERSION} is running!")
    
    yield
    
    # Shutdown
    print("👋 Shutting down...")
    await close_redis()
    print("✅ Redis disconnected")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files
if os.path.exists(settings.UPLOAD_DIR):
    app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# API Routes
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(chat.router, prefix="/api/v1/chat", tags=["Chat"])
app.include_router(study.router, prefix="/api/v1/study", tags=["Study"])
app.include_router(voice.router, prefix="/api/v1/voice", tags=["Voice"])
app.include_router(reminders.router, prefix="/api/v1/reminders", tags=["Reminders"])

# WebSocket
app.add_websocket_route("/ws", websocket.websocket_endpoint)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        redis = await get_redis()
        await redis.ping()
        redis_status = "connected"
    except:
        redis_status = "disconnected"
    
    return {
        "status": "healthy",
        "database": "connected",
        "redis": redis_status
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
