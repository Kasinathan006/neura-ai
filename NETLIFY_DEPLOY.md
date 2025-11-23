# NEURA AI - Netlify Deployment Guide

## 🚀 Deploy NEURA AI to Netlify (Complete Guide)

This guide will help you deploy the complete NEURA AI system with Netlify hosting the frontend.

---

## 📋 Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│  NETLIFY (Frontend)                             │
│  https://neura-ai.netlify.app                   │
│  ├── React App                                  │
│  ├── Static Assets                              │
│  └── SPA Routing                                │
└─────────────────────────────────────────────────┘
                    ↓ API Calls
┌─────────────────────────────────────────────────┐
│  RENDER.COM (Backend - Recommended)             │
│  https://neura-ai-backend.onrender.com          │
│  ├── FastAPI Server                             │
│  ├── PostgreSQL (Neon.tech)                     │
│  └── Redis (Upstash)                            │
└─────────────────────────────────────────────────┘
```

---

## 🎯 OPTION 1: Netlify Frontend + Render Backend (RECOMMENDED)

### Step 1: Prepare the Project

```bash
# Navigate to project
cd C:\Users\mohan\Downloads\neura-ai

# Initialize git if not already done
git init
git add .
git commit -m "Initial commit - NEURA AI"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `neura-ai`
3. Make it **Public** or **Private**
4. Click **"Create repository"**

5. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/neura-ai.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy Backend to Render (5 minutes)

#### 3.1 Setup Database (Neon.tech)

1. Go to https://neon.tech
2. Sign up and create a new project
3. Name: `neura-ai-db`
4. Copy the connection string (starts with `postgresql://`)

#### 3.2 Setup Redis (Upstash)

1. Go to https://upstash.com
2. Create a new Redis database
3. Name: `neura-ai-redis`
4. Copy the connection string

#### 3.3 Deploy to Render

1. Go to https://render.com
2. Sign up with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your `neura-ai` repository
5. Configure:
   - **Name**: `neura-ai-backend`
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free

6. Add Environment Variables:
```env
DATABASE_URL=postgresql://your-neon-connection-string
REDIS_URL=redis://your-upstash-connection-string
JWT_SECRET_KEY=your-random-secret-key-here
OPENAI_API_KEY=sk-your-key
ANTHROPIC_API_KEY=sk-ant-your-key
GOOGLE_API_KEY=your-key
DEEPSEEK_API_KEY=sk-your-key
ELEVENLABS_API_KEY=your-key
CORS_ORIGINS=https://neura-ai.netlify.app
DEBUG=False
```

7. Click **"Create Web Service"**
8. Wait for deployment (5-10 minutes)
9. Your backend URL: `https://neura-ai-backend.onrender.com`

10. Run migrations:
   - Go to **Shell** tab
   - Run: `alembic upgrade head`

### Step 4: Deploy Frontend to Netlify (3 minutes)

#### 4.1 Update Frontend Environment

Edit `frontend/.env`:
```env
VITE_API_URL=https://neura-ai-backend.onrender.com
VITE_WS_URL=wss://neura-ai-backend.onrender.com
```

Commit changes:
```bash
git add frontend/.env
git commit -m "Update production API URL"
git push
```

#### 4.2 Deploy to Netlify

**Method A: GitHub Integration (Recommended)**

1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify
5. Select your `neura-ai` repository
6. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `frontend/dist`
7. Click **"Show advanced"** → **"New variable"**
   - Add environment variables:
     ```
     VITE_API_URL = https://neura-ai-backend.onrender.com
     VITE_WS_URL = wss://neura-ai-backend.onrender.com
     ```
8. Click **"Deploy site"**

**Method B: Drag & Drop (Quick Test)**

1. Build locally:
```bash
cd frontend
npm install
npm run build
```

2. Go to https://app.netlify.com
3. Drag the `dist` folder to the deploy area
4. Your site is live!

#### 4.3 Configure Site

1. After deployment, go to **Site settings**
2. **Domain management** → **Options** → **Edit site name**
3. Change to: `neura-ai` (if available)
4. Your URL: `https://neura-ai.netlify.app`

### Step 5: Update CORS

1. Go back to Render dashboard
2. Open your backend service
3. Go to **Environment** tab
4. Update `CORS_ORIGINS`:
```
CORS_ORIGINS=https://neura-ai.netlify.app,https://www.neura-ai.netlify.app
```
5. Save (auto-redeploys)

### Step 6: Test Deployment

1. Visit: `https://neura-ai.netlify.app`
2. Register a new account
3. Login
4. Test chat functionality
5. Generate flashcards
6. Try voice features

---

## 🎯 OPTION 2: Netlify with Serverless Functions (Advanced)

If you want to host backend on Netlify too (limited functionality):

### Create Netlify Functions

```bash
mkdir -p netlify/functions
```

Create a sample function:

```javascript
// netlify/functions/chat.js
exports.handler = async (event, context) => {
  const { message } = JSON.parse(event.body);
  
  // Call OpenAI API
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }]
    })
  });
  
  const data = await response.json();
  
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
```

**Note**: This approach has limitations (no WebSockets, no database, cold starts). Render backend is recommended.

---

## 🎯 OPTION 3: Netlify CLI Deployment

### Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Login

```bash
netlify login
```

### Deploy

```bash
cd C:\Users\mohan\Downloads\neura-ai

# Initialize Netlify
netlify init

# Build and deploy
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

---

## ✅ Post-Deployment Checklist

- [ ] Backend is running: `https://neura-ai-backend.onrender.com/health`
- [ ] API docs accessible: `https://neura-ai-backend.onrender.com/docs`
- [ ] Frontend loads: `https://neura-ai.netlify.app`
- [ ] Can register new account
- [ ] Can login
- [ ] Chat works
- [ ] Flashcards generate
- [ ] Voice recording works
- [ ] Reminders create

---

## 🔧 Netlify Configuration

### Custom Domain

1. Buy domain (Namecheap, GoDaddy, etc.)
2. In Netlify: **Domain settings** → **Add custom domain**
3. Add DNS records:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   
   Type: CNAME
   Name: www
   Value: neura-ai.netlify.app
   ```

### Environment Variables

Add in Netlify dashboard under **Site settings** → **Environment variables**:

```
VITE_API_URL=https://neura-ai-backend.onrender.com
VITE_WS_URL=wss://neura-ai-backend.onrender.com
```

### Build Settings

```toml
[build]
  base = "frontend"
  command = "npm install && npm run build"
  publish = "frontend/dist"
```

### Deploy Previews

Netlify automatically creates preview deployments for pull requests.

---

## 📊 Monitoring

### Netlify Analytics

1. Go to **Analytics** tab
2. Enable Netlify Analytics ($9/month)
3. View traffic, performance, etc.

### Deploy Notifications

1. **Site settings** → **Build & deploy** → **Deploy notifications**
2. Add Slack, email, or webhook notifications

---

## 🐛 Troubleshooting

### Build Fails

**Error**: `Command failed with exit code 1`

**Solution**:
1. Check build logs in Netlify
2. Verify `package.json` is correct
3. Ensure all dependencies are listed
4. Try building locally first

### 404 on Refresh

**Error**: Page not found when refreshing

**Solution**: Already fixed in `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### API Calls Fail

**Error**: CORS or network errors

**Solution**:
1. Check backend CORS settings
2. Verify API URL in environment variables
3. Check backend is running: `https://your-backend.onrender.com/health`

### Environment Variables Not Working

**Solution**:
1. Ensure variables start with `VITE_`
2. Rebuild after adding variables
3. Check in **Site settings** → **Environment variables**

---

## 💰 Costs

### Free Tier

- **Netlify**: 100GB bandwidth, 300 build minutes/month
- **Render**: 750 hours/month (backend sleeps after 15 min)
- **Neon**: 3GB storage, 1 database
- **Upstash**: 10,000 commands/day

### Paid Plans (When Needed)

- **Netlify Pro**: $19/month (more bandwidth, analytics)
- **Render Starter**: $7/month (no sleep, better performance)
- **Neon Scale**: $19/month (more storage)
- **Upstash Pro**: $10/month (more commands)

---

## 🚀 Performance Optimization

### Enable Netlify Features

1. **Asset Optimization**: Auto-enabled
2. **Prerendering**: For better SEO
3. **Split Testing**: A/B test different versions
4. **Edge Functions**: Run code at the edge

### CDN

Netlify automatically serves your site from global CDN.

---

## 📱 Progressive Web App (PWA)

Add to `frontend/public/manifest.json`:

```json
{
  "name": "NEURA AI",
  "short_name": "NEURA",
  "description": "Hyper-Intelligent Multi-Agent System",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#020617",
  "theme_color": "#0ea5e9",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 🎉 Success!

Your NEURA AI is now live on Netlify!

**URLs**:
- 🌐 App: `https://neura-ai.netlify.app`
- 🔧 Backend: `https://neura-ai-backend.onrender.com`
- 📚 API Docs: `https://neura-ai-backend.onrender.com/docs`

**Next Steps**:
- [ ] Add custom domain
- [ ] Enable analytics
- [ ] Set up monitoring
- [ ] Share with users
- [ ] Collect feedback

---

## 📞 Support

- **Netlify Docs**: https://docs.netlify.com
- **Netlify Community**: https://answers.netlify.com
- **GitHub Issues**: https://github.com/YOUR_USERNAME/neura-ai/issues

---

**Deployed with ❤️ on Netlify**
