# 🚀 NEURA AI - Full Stack Deployment to Render.com

## ✅ Complete Guide: Deploy Frontend + Backend Together

This guide will help you deploy the **complete NEURA AI system** (frontend + backend) to Render.com in about 10 minutes.

---

## 📋 What You'll Get

- ✅ **Live Frontend** - Beautiful React app
- ✅ **Live Backend** - FastAPI with database
- ✅ **Free Hosting** - Render.com free tier
- ✅ **Auto HTTPS** - Secure by default
- ✅ **Auto Deploy** - Push to GitHub = auto deploy

---

## 🎯 STEP-BY-STEP DEPLOYMENT

### STEP 1: Push to GitHub (5 minutes)

#### 1.1 Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `neura-ai`
3. Make it **Public** (required for free tier)
4. **Don't** initialize with README
5. Click **"Create repository"**

#### 1.2 Push Your Code

Open terminal in `C:\Users\mohan\Downloads\neura-ai\` and run:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - NEURA AI v1.0"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/neura-ai.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**✅ Your code is now on GitHub!**

---

### STEP 2: Setup Free Database (3 minutes)

#### 2.1 Create PostgreSQL Database (Neon.tech)

1. Go to https://neon.tech
2. Sign up with GitHub (free)
3. Click **"Create Project"**
4. Name: `neura-ai-db`
5. Region: Choose closest to you
6. Click **"Create Project"**

#### 2.2 Get Connection String

1. In project dashboard, click **"Connection Details"**
2. Copy the **Connection String**
3. Save it - looks like:
   ```
   postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neuradb?sslmode=require
   ```

#### 2.3 Create Redis Database (Upstash)

1. Go to https://upstash.com
2. Sign up with GitHub (free)
3. Click **"Create Database"**
4. Name: `neura-ai-redis`
5. Type: **Regional**
6. Region: Choose closest to you
7. Click **"Create"**

#### 2.4 Get Redis URL

1. In database dashboard, find **"Endpoint"**
2. Copy the Redis URL
3. Save it - looks like:
   ```
   redis://default:password@region.upstash.io:6379
   ```

---

### STEP 3: Deploy Backend to Render (3 minutes)

#### 3.1 Create Web Service

1. Go to https://render.com
2. Sign up with GitHub
3. Click **"New +"** → **"Web Service"**
4. Click **"Connect a repository"**
5. Find and select your `neura-ai` repository
6. Click **"Connect"**

#### 3.2 Configure Backend

Fill in these settings:

**Basic Info:**
- **Name**: `neura-ai-backend`
- **Region**: Oregon (or closest to you)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Python 3`

**Build & Deploy:**
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

**Plan:**
- Select **"Free"**

#### 3.3 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

```
DATABASE_URL = [paste your Neon PostgreSQL URL]
REDIS_URL = [paste your Upstash Redis URL]
JWT_SECRET_KEY = [generate random string - see below]
JWT_ALGORITHM = HS256
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7
OPENAI_API_KEY = [your OpenAI key - optional]
ANTHROPIC_API_KEY = [your Anthropic key - optional]
GOOGLE_API_KEY = [your Google key - optional]
DEEPSEEK_API_KEY = [your DeepSeek key - optional]
ELEVENLABS_API_KEY = [your ElevenLabs key - optional]
APP_NAME = NEURA AI
APP_VERSION = 1.0.0
DEBUG = False
CORS_ORIGINS = https://neura-ai-frontend.onrender.com
MAX_FILE_SIZE_MB = 50
UPLOAD_DIR = ./uploads
RATE_LIMIT_PER_MINUTE = 60
```

**To generate JWT_SECRET_KEY:**
Open terminal and run:
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```
Copy the output and paste as JWT_SECRET_KEY

#### 3.4 Deploy Backend

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Your backend URL will be: `https://neura-ai-backend.onrender.com`

#### 3.5 Verify Backend

Once deployed, visit:
```
https://neura-ai-backend.onrender.com/health
```

Should see:
```json
{
  "status": "healthy",
  "database": "connected",
  "redis": "connected"
}
```

**✅ Backend is live!**

---

### STEP 4: Deploy Frontend to Render (2 minutes)

#### 4.1 Update Frontend Environment

Before deploying frontend, we need to update the API URL.

**Option A: Update in GitHub**
1. Go to your GitHub repository
2. Navigate to `frontend/.env.example`
3. Click edit
4. Change to:
   ```
   VITE_API_URL=https://neura-ai-backend.onrender.com
   VITE_WS_URL=wss://neura-ai-backend.onrender.com
   ```
5. Commit changes

**Option B: Update locally and push**
```bash
cd frontend
# Edit .env.example with the URLs above
git add .env.example
git commit -m "Update API URLs for production"
git push
```

#### 4.2 Create Frontend Service

1. In Render dashboard, click **"New +"** → **"Static Site"**
2. Select your `neura-ai` repository
3. Click **"Connect"**

#### 4.3 Configure Frontend

**Basic Info:**
- **Name**: `neura-ai-frontend`
- **Branch**: `main`
- **Root Directory**: `frontend`

**Build Settings:**
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `frontend/dist`

**Environment Variables:**
Click **"Advanced"** → Add:
```
VITE_API_URL = https://neura-ai-backend.onrender.com
VITE_WS_URL = wss://neura-ai-backend.onrender.com
```

#### 4.4 Deploy Frontend

1. Click **"Create Static Site"**
2. Wait 3-5 minutes for build
3. Your frontend URL: `https://neura-ai-frontend.onrender.com`

**✅ Frontend is live!**

---

### STEP 5: Update CORS (1 minute)

Now that frontend is deployed, update backend CORS:

1. Go to Render dashboard
2. Click on `neura-ai-backend` service
3. Go to **"Environment"** tab
4. Find `CORS_ORIGINS` variable
5. Update to: `https://neura-ai-frontend.onrender.com`
6. Click **"Save Changes"**
7. Backend will auto-redeploy

---

## 🎉 YOU'RE LIVE!

Your complete NEURA AI system is now deployed!

**URLs:**
- 🌐 **Frontend**: https://neura-ai-frontend.onrender.com
- 🔧 **Backend**: https://neura-ai-backend.onrender.com
- 📚 **API Docs**: https://neura-ai-backend.onrender.com/docs

---

## ✅ TEST YOUR DEPLOYMENT

### 1. Visit Frontend
Go to: `https://neura-ai-frontend.onrender.com`

### 2. Register Account
1. Click "Sign up"
2. Create account
3. Login

### 3. Test Features
- ✅ Chat with AI
- ✅ Generate flashcards
- ✅ Create reminders
- ✅ Use voice features
- ✅ Browse dashboard

---

## 🔧 MANAGE YOUR DEPLOYMENT

### View Logs

**Backend Logs:**
1. Render dashboard → `neura-ai-backend`
2. Click **"Logs"** tab
3. See real-time logs

**Frontend Logs:**
1. Render dashboard → `neura-ai-frontend`
2. Click **"Logs"** tab

### Redeploy

**Manual Redeploy:**
- Click **"Manual Deploy"** → **"Deploy latest commit"**

**Auto Redeploy:**
- Just push to GitHub - auto deploys!

### Custom Domain (Optional)

1. Buy domain (Namecheap, GoDaddy, etc.)
2. In Render: **Settings** → **Custom Domain**
3. Add your domain
4. Update DNS records as shown

---

## 💰 COSTS

### Free Tier Limits:
- **Render Web Service**: 750 hours/month (sleeps after 15 min inactivity)
- **Render Static Site**: Unlimited
- **Neon Database**: 3GB storage, 1 database
- **Upstash Redis**: 10,000 commands/day

### Wake Up Time:
- Free tier services sleep after 15 minutes
- First request takes ~30 seconds to wake up
- Subsequent requests are instant

### Upgrade (Optional):
- **Render Starter**: $7/month (no sleep, better performance)
- **Neon Scale**: $19/month (more storage)
- **Upstash Pro**: $10/month (more commands)

---

## 🐛 TROUBLESHOOTING

### Backend Won't Start

**Check:**
1. Logs in Render dashboard
2. All environment variables are set
3. DATABASE_URL and REDIS_URL are correct

**Fix:**
- Verify connection strings
- Check for typos in env vars
- Redeploy manually

### Frontend Can't Connect to Backend

**Check:**
1. CORS settings in backend
2. VITE_API_URL is correct
3. Backend is running (visit /health)

**Fix:**
- Update CORS_ORIGINS in backend
- Verify API URL in frontend env vars
- Check browser console for errors

### Database Connection Failed

**Check:**
1. Neon database is active
2. Connection string is correct
3. SSL mode is enabled

**Fix:**
- Copy connection string again from Neon
- Ensure `?sslmode=require` is at the end

### Build Fails

**Check:**
1. Build logs in Render
2. package.json is correct
3. All dependencies listed

**Fix:**
- Check for syntax errors
- Verify build command
- Try building locally first

---

## 🔄 UPDATE YOUR APP

### Update Code:

```bash
# Make changes locally
git add .
git commit -m "Update: description of changes"
git push
```

**Render auto-deploys!** ✨

### Update Environment Variables:

1. Render dashboard → Your service
2. **Environment** tab
3. Update variables
4. Click **"Save Changes"**
5. Auto-redeploys

---

## 📊 MONITORING

### Health Checks

**Backend:**
```
https://neura-ai-backend.onrender.com/health
```

**Frontend:**
```
https://neura-ai-frontend.onrender.com
```

### Performance

- View metrics in Render dashboard
- Monitor response times
- Check error rates

---

## 🎯 NEXT STEPS

### Immediate:
- ✅ Test all features
- ✅ Share your URL
- ✅ Get feedback

### Optional:
- 🔧 Add custom domain
- 📊 Enable analytics
- 🔐 Add more security
- 🚀 Upgrade for better performance
- 🤖 Add real AI API keys

---

## 📞 SUPPORT

**Render:**
- Docs: https://render.com/docs
- Community: https://community.render.com

**Neon:**
- Docs: https://neon.tech/docs
- Support: https://neon.tech/docs/introduction/support

**Upstash:**
- Docs: https://docs.upstash.com
- Support: https://upstash.com/docs

---

## 🎊 CONGRATULATIONS!

You've successfully deployed the complete NEURA AI system!

**What you achieved:**
- ✅ Full-stack app deployed
- ✅ Frontend + Backend working together
- ✅ Database connected
- ✅ Redis caching active
- ✅ HTTPS enabled
- ✅ Auto-deploy configured
- ✅ Free hosting

**Share your deployment:**
- Tweet about it
- Add to portfolio
- Show friends
- Get users!

---

**Deployed with ❤️ on Render.com**

*NEURA AI - Making AI accessible, powerful, and beautiful.*
