# Quick Start Guide

Get the Zero-Touch Growth OS running in **10 minutes**.

## 🚀 Super Quick Setup (Testing Mode)

Just want to see it work? **No API keys needed!**

```bash
# 1. Install
npm install

# 2. Run (uses fallback data automatically)
npm run dev

# 3. Open browser
# Go to http://localhost:3000
```

**Done!** The app works with sample data. All features are functional.

---

## ⚡ Full Setup (With Real APIs - 15 minutes)

### Step 1: Get API Keys (5 minutes)

#### Gemini API Key
```
1. Go to: https://aistudio.google.com
2. Click "Get API Key"
3. Create API key
4. Copy the key
```

#### Unsplash API Key
```
1. Go to: https://unsplash.com/developers
2. Create account
3. Create Application
4. Copy Access Key
```

#### Firebase Config
```
1. Go to: https://console.firebase.google.com
2. Create new project
3. Go to Project Settings
4. Copy all config values
```

### Step 2: Configure Environment (2 minutes)

```bash
# Copy template
cp .env.example .env.local

# Edit .env.local and add your keys:
NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
NEXT_PUBLIC_UNSPLASH_API_KEY=your_key_here
NEXT_PUBLIC_FIREBASE_API_KEY=your_key_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
# ... etc
```

### Step 3: Install & Run (2 minutes)

```bash
npm install
npm run dev
```

### Step 4: Test Features

Visit [http://localhost:3000](http://localhost:3000) and:

1. ✅ Fill business onboarding form
2. ✅ See AI-generated business profile
3. ✅ View AI content calendar
4. ✅ Generate captions
5. ✅ Check festivals
6. ✅ View ad recommendations
7. ✅ See dashboard metrics

---

## 🌐 Deploy to Vercel (5 minutes)

### Option A: Zero-Config (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# When prompted for environment variables, paste them
```

### Option B: GitHub Integration

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy via Vercel.com**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repo
   - Add environment variables
   - Click "Deploy"

### Option C: Vercel Dashboard

1. Go to Vercel.com → Settings → Environment Variables
2. Add all keys from `.env.local`
3. Redeploy with `vercel --prod`

---

## ✅ Verification Checklist

After setup, verify everything works:

```bash
# Check Node version
node --version        # Should be 18+

# Check npm packages
npm ls              # Should show dependencies

# Test API routes
curl http://localhost:3000/api/festivals

# Check environment
grep NEXT_PUBLIC .env.local | wc -l  # Should see 8 lines

# Build to check for errors
npm run build
```

---

## 🆘 Common Issues & Fixes

### Issue 1: "NEXT_PUBLIC_GEMINI_API_KEY is not defined"
```
❌ Problem: .env.local not loaded

✅ Solution: 
- Restart dev server: npm run dev
- Make sure .env.local exists in project root
- Check no extra spaces in variable names
```

### Issue 2: "Module not found: @/lib/firebase"
```
❌ Problem: TypeScript path aliases not working

✅ Solution:
- Delete .next folder: rm -rf .next
- Restart: npm run dev
- Check tsconfig.json has paths configured
```

### Issue 3: "Rate limit exceeded"
```
❌ Problem: Gemini API rate limit hit

✅ Solution:
- App automatically uses fallback data
- User sees notification about fallback
- Cached responses for 1 hour
- Try again after 1 minute
```

### Issue 4: "Firebase connection failed"
```
❌ Problem: Wrong Firebase config or rules

✅ Solution:
- Check all Firebase keys are correct
- Go to Firebase console → Storage → Rules
- Set rules to allow everyone (for dev):
  match /{allPaths=**} {
    allow read, write;
  }
```

---

## 📱 Testing on Mobile

### Local Network Access
```bash
# Get your local IP
# Windows: ipconfig | find "IPv4"
# Mac/Linux: ifconfig | grep "inet "

# Example: 192.168.1.100
npm run dev -- --host

# Visit: http://192.168.1.100:3000 on mobile
```

### Responsive Testing in Chrome
- Press F12 → Click device toggle (mobile icon)
- Test on iPhone 12, Pixel 6, iPad
- Check all pages are responsive

---

## 🧪 Test with Sample Data

Don't have API keys? No problem! Test with built-in samples:

**Test Businesses:**

1. **Coffee Roastery**
   - Name: Brew Haven
   - Type: Food & Beverage
   - Audience: Coffee enthusiasts

2. **Fashion Boutique**
   - Name: Aara Fashion
   - Type: Retail
   - Audience: Young women

3. **EdTech Startup**
   - Name: CodeMasters
   - Type: Education
   - Audience: Students & career changers

See [TESTING_GUIDE.md](TESTING_GUIDE.md) for detailed test cases.

---

## 🚨 Production Checklist

Before submitting:

- [ ] All 6 features working end-to-end
- [ ] No API keys in source code
- [ ] .env.local added to .gitignore
- [ ] README complete with setup instructions
- [ ] Deployed to Vercel with working URL
- [ ] Test on 3 different sample businesses
- [ ] Mobile responsive tested
- [ ] No console errors
- [ ] Fast load times (<3s)

---

## 📞 Quick Help

**Feature not working?**
1. Check `.env.local` has all keys
2. Restart dev server: `npm run dev`
3. Clear browser cache: Ctrl+Shift+Del
4. Check console errors: F12 → Console tab

**Want to use real data?**
1. Add Firebase Firestore
2. Save business profiles to database
3. Update API routes to query Firestore

**Want to extend?**
1. Add Meta Ads API integration
2. Add email campaign builder
3. Add team collaboration features
4. Add scheduling system

---

## 🎓 Learning Path

1. **Understand Architecture**: Read `README.md`
2. **Walk Through Code**: Open `app/page.tsx`
3. **Check API Routes**: Look at `app/api/*`
4. **Review Components**: Browse `components/`
5. **Deploy to Vercel**: Follow deployment guide
6. **Modify & Experiment**: Change prompts, add features

---

## 💾 Sample API Responses

### Business Profile Response
```json
{
  "businessName": "Brew Haven",
  "industry": "Specialty Coffee",
  "targetAudience": "Coffee professionals and enthusiasts",
  "location": "Bangalore, India",
  "keyStrengths": ["Small-batch roasting", "Sustainable sourcing"],
  "contentPillars": ["Coffee education", "Customer stories"],
  "competitorAnalysis": "Main competitors are national chains",
  "marketOpportunity": "Growing specialty coffee market"
}
```

### Caption Response
```json
{
  "variation": 1,
  "caption": "Morning mood activated ☕✨...",
  "hashtags": ["#SpecialtyCoffee", "#CoffeeLovers"],
  "cta": "Shop Now"
}
```

### Festival Response
```json
{
  "name": "Diwali",
  "date": "October 30, 2026",
  "daysAway": 212,
  "category": "Religious Festival",
  "campaignIdea": "Create Diwali-themed products and offers..."
}
```

---

## 🎯 Next Steps

1. ✅ Set up locally (10 min)
2. ✅ Test all features (5 min)
3. ✅ Deploy to Vercel (5 min)
4. ✅ Test with sample businesses (10 min)
5. ✅ Prepare demo (15 min)

**Total: ~45 minutes to full demo-ready state**

Good luck! 🚀
