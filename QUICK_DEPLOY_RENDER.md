# ⚡ QUICK DEPLOY - NEURA AI to Render.com

## 🎯 Deploy in 10 Minutes

### ✅ Step 1: GitHub (2 min)
```bash
cd C:\Users\mohan\Downloads\neura-ai
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/neura-ai.git
git push -u origin main
```

### ✅ Step 2: Database (3 min)
1. **Neon.tech** → Create PostgreSQL → Copy URL
2. **Upstash.com** → Create Redis → Copy URL

### ✅ Step 3: Backend (3 min)
1. **Render.com** → New Web Service
2. Connect GitHub repo
3. Root: `backend`
4. Build: `pip install -r requirements.txt`
5. Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Add environment variables (DATABASE_URL, REDIS_URL, etc.)
7. Deploy!

### ✅ Step 4: Frontend (2 min)
1. **Render.com** → New Static Site
2. Connect same repo
3. Root: `frontend`
4. Build: `npm install && npm run build`
5. Publish: `frontend/dist`
6. Add env vars (VITE_API_URL, VITE_WS_URL)
7. Deploy!

## 🎉 DONE!

**Your URLs:**
- Frontend: `https://neura-ai-frontend.onrender.com`
- Backend: `https://neura-ai-backend.onrender.com`

**See RENDER_DEPLOYMENT.md for detailed instructions**
