# 🚀 DEPLOY NEURA AI TO NETLIFY - QUICK START

## ⚡ Fastest Way to Deploy (5 Minutes)

### Option 1: Drag & Drop (EASIEST - No CLI needed)

1. **Build the frontend**:
   ```bash
   cd C:\Users\mohan\Downloads\neura-ai\frontend
   npm install
   npm run build
   ```

2. **Deploy**:
   - Go to https://app.netlify.com/drop
   - Drag the `frontend\dist` folder to the page
   - Wait 30 seconds
   - Your site is LIVE! 🎉

3. **Get your URL**:
   - Netlify will give you a URL like: `https://random-name-123.netlify.app`
   - You can customize it in site settings

---

### Option 2: Automated Script (Windows)

1. **Run the deploy script**:
   ```bash
   cd C:\Users\mohan\Downloads\neura-ai
   deploy-netlify.bat
   ```

2. **Choose option 3** (Drag & Drop)
   - Script will open Netlify and the dist folder
   - Just drag and drop!

---

### Option 3: GitHub + Netlify (Auto-deploy on push)

1. **Push to GitHub**:
   ```bash
   cd C:\Users\mohan\Downloads\neura-ai
   git init
   git add .
   git commit -m "Initial commit"
   
   # Create repo on GitHub first, then:
   git remote add origin https://github.com/YOUR_USERNAME/neura-ai.git
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select your `neura-ai` repository
   - Configure:
     - Base directory: `frontend`
     - Build command: `npm install && npm run build`
     - Publish directory: `frontend/dist`
   - Add environment variables:
     ```
     VITE_API_URL = https://neura-ai-backend.onrender.com
     VITE_WS_URL = wss://neura-ai-backend.onrender.com
     ```
   - Click "Deploy site"

---

## 🔧 What About the Backend?

The backend needs a server. Here are your options:

### Option A: Deploy Backend to Render.com (Recommended - Free)

1. Go to https://render.com
2. Sign up with GitHub
3. Create "Web Service"
4. Connect your repo
5. Configure:
   - Root: `backend`
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Add environment variables (see NETLIFY_DEPLOY.md)
7. Deploy!

Your backend will be at: `https://neura-ai-backend.onrender.com`

### Option B: Use Mock Backend (Testing Only)

For quick testing, you can use mock data in the frontend:

Edit `frontend/src/lib/api.js`:
```javascript
// Mock mode for testing
const MOCK_MODE = true;

if (MOCK_MODE) {
  // Return mock data instead of API calls
}
```

### Option C: Deploy Backend to Netlify Functions (Limited)

See `NETLIFY_DEPLOY.md` for serverless function setup.

---

## ✅ Quick Checklist

- [ ] Frontend built: `cd frontend && npm run build`
- [ ] Deployed to Netlify (drag & drop or GitHub)
- [ ] Backend deployed to Render (or using mock data)
- [ ] Environment variables set
- [ ] CORS configured
- [ ] Tested the deployment

---

## 🎯 Right Now - Do This:

### Step 1: Build Frontend (2 minutes)
```bash
cd C:\Users\mohan\Downloads\neura-ai\frontend
npm install
npm run build
```

### Step 2: Deploy (1 minute)
- Go to https://app.netlify.com/drop
- Drag `frontend\dist` folder
- Done!

### Step 3: Test
- Visit your Netlify URL
- App will load (backend features won't work without backend deployment)

---

## 🚀 Full Production Setup

For full functionality, you need:

1. ✅ Frontend on Netlify (you're doing this now)
2. ⏳ Backend on Render.com (see NETLIFY_DEPLOY.md)
3. ⏳ Database on Neon.tech (free PostgreSQL)
4. ⏳ Redis on Upstash (free Redis)

**Total time: ~15 minutes**
**Total cost: $0 (free tier)**

---

## 📞 Need Help?

- Full guide: `NETLIFY_DEPLOY.md`
- Backend setup: `PRODUCTION_DEPLOYMENT.md`
- Issues: Check the troubleshooting section

---

## 🎉 You're Almost There!

Just run these commands and you'll be live:

```bash
cd C:\Users\mohan\Downloads\neura-ai\frontend
npm install
npm run build
```

Then drag `dist` folder to https://app.netlify.com/drop

**That's it! 🚀**
