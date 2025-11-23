# NEURA AI Backend

FastAPI backend for NEURA AI - Hyper-Intelligent Multi-Agent Autonomous System.

## 🚀 Quick Start

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env with your API keys

# Run server
uvicorn app.main:app --reload
```

## 📦 Features

- ✅ FastAPI with async support
- ✅ PostgreSQL database
- ✅ Redis caching
- ✅ JWT authentication
- ✅ WebSocket real-time chat
- ✅ AI integration (GPT-4, Claude, Gemini, DeepSeek)
- ✅ Voice processing (Whisper, TTS)
- ✅ Spaced repetition (SM-2 algorithm)
- ✅ Natural language time parsing

## 🛠️ Tech Stack

- FastAPI 0.109.0
- SQLAlchemy 2.0.25
- PostgreSQL
- Redis
- Python-Jose (JWT)
- Passlib (Password hashing)
- OpenAI, Anthropic, Google AI

## 📝 API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🔒 Security

- JWT authentication with refresh tokens
- Password hashing with bcrypt
- CORS protection
- Environment-based secrets

## 📄 License

MIT
