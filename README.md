# Zero-Touch Growth Operating System

**NMIMS INNOVATHON 2026 - Challenge 1**

An autonomous digital growth platform built with Next.js that replaces the need for a full-time social media manager. The system intelligently understands a business, generates creative assets, automates social media management, and optimizes ad performance with minimal human intervention.

## 🎯 Features (MVP)

✅ **Business Intelligence Layer** - AI-powered business profile analysis
✅ **Weekly Content Calendar** - 7-day intelligent content plan with festival awareness  
✅ **AI Caption Generator** - Multiple caption variations with hashtags & CTAs
✅ **Festival/Trend Detector** - Upcoming festivals and campaign opportunities
✅ **Ad Recommendation Engine** - Mock AI-powered audience targeting suggestions
✅ **Performance Dashboard** - Analytics and AI-powered insights
✅ **Integration Demo** - End-to-end workflow demonstration

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Backend**: Next.js API Routes (Serverless)
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **AI Engine**: Google Gemini 1.5 Flash
- **Image API**: Unsplash API
- **UI**: Tailwind CSS + Custom Components
- **Charts**: Recharts
- **Deployment**: Vercel

**Total Cost: ₹0** (All free tier services)

## 📋 Prerequisites

- Node.js 18+ and npm
- Git & GitHub account
- Google Account (for Gemini API)
- Firebase Project
- API Keys:
  - Google Gemini 1.5 Flash
  - Unsplash API
  - Firebase Configuration

## 🚀 Setup Instructions

### 1. Clone & Install

```bash
# Clone the repository
git clone <repo-url>
cd zero-touch-growth-os

# Install dependencies
npm install
```

### 2. API Key Configuration

#### Get Gemini API Key (2 minutes)
1. Go to [Google AI Studio](https://aistudio.google.com)
2. Click "Get API Key"
3. Create new API key for free project
4. Copy the key

#### Get Unsplash API Key (2 minutes)
1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create account or login
3. Create new application
4. Copy Access Key

#### Setup Firebase (5 minutes)
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project
3. Go to Project Settings → General
4. Copy Web SDK config

### 3. Environment Variables

```bash
# Copy example file
cp .env.example .env.local

# Fill in your API keys in .env.local
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_UNSPLASH_API_KEY=your_unsplash_api_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**⚠️ IMPORTANT**: Never commit `.env.local` to GitHub!

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage Guide

### Step-by-Step Workflow

1. **Business Onboarding** (Homepage)
   - Enter business name, type, target audience, location
   - AI analyzes and generates business profile
   - Profile saved to understand your business context

2. **Weekly Content Calendar**
   - AI generates 7-day plan considering upcoming festivals
   - Includes content themes, best posting times, content types
   - Aligned with India-specific festivals and trends

3. **Caption Generator**
   - Paste product description
   - Select brand tone (Professional, Casual, Inspirational, etc.)
   - Get 3 variations with hashtags and CTAs
   - Copy to clipboard for direct use

4. **Festival Detector**
   - View upcoming festivals (next 30 days)
   - Get specific campaign ideas for each festival
   - Plan content around cultural moments

5. **Ad Recommendations** *(Mock)*
   - Audience targeting suggestions based on business profile
   - Creative type recommendations
   - Performance metrics estimates
   - Budget allocation guidance

6. **Performance Dashboard**
   - Mock analytics showing reach, engagement, platform breakdown
   - AI-powered insights and recommendations
   - Content type performance analysis
   - Real would integrate with Meta Ads Manager / Google Ads API

## 🔄 How API Fallback Works

The system is designed with **graceful degradation**:

1. **Primary**: Calls Google Gemini API for AI generation
2. **Fallback**: If rate limited or API fails, returns pre-seeded sample responses
3. **Caching**: Responses cached for 1 hour in browser localStorage
4. **User Feedback**: User notified when using fallback/cached data

This ensures the app keeps working even if APIs are rate-limited.

## 🌐 Deployment to Vercel

### Option 1: GitHub Integration (Recommended)

```bash
# Push to GitHub
git push origin main

# Go to Vercel.com
# Click "Import Project"
# Select you GitHub repository
# Vercel auto-detects Next.js
# Add environment variables in Vercel dashboard
# Click "Deploy"
```

### Option 2: CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables when prompted
```

### Environment Variables in Vercel

Add all keys from `.env.local` to Vercel:
- `NEXT_PUBLIC_GEMINI_API_KEY`
- `NEXT_PUBLIC_UNSPLASH_API_KEY`
- `NEXT_PUBLIC_FIREBASE_*` (all Firebase keys)

## 📊 MVP Features Breakdown

| Feature | Status | Details |
|---------|--------|---------|
| Business Onboarding | ✅ Complete | Form input, AI profile generation |
| Weekly Calendar | ✅ Complete | 7-day plan with festivals & timings |
| Caption Generator | ✅ Complete | 3 variations per product, hashtags, CTAs |
| Festival Detector | ✅ Complete | Next 30 days, campaign ideas |
| Ad Recommendations | ✅ Complete | Mock audience, creatives, budgets |
| Performance Dashboard | ✅ Complete | Analytics mockup with charts |
| Integration Demo | ✅ Complete | End-to-end workflow |

## 🎯 Stretch Goals (Not in MVP)

- [ ] Real Meta/Google Ads API integration
- [ ] Video generation with Runway or Synthesia
- [ ] Email campaign management
- [ ] Discord/Slack notification integration
- [ ] Real business profile storage in Firestore
- [ ] Team collaboration features
- [ ] Multi-language support
- [ ] Mobile app version

## 🚨 Important Notes

### API Rate Limits

- **Gemini**: 15 requests/minute, 1M tokens/day (free tier)
- **Unsplash**: 50 requests/hour (free tier)
- **Firebase**: 50K reads/day (free Spark tier)

### Fallback Mechanism

The app uses intelligent fallback:
- If Gemini API is rate limited → returns pre-seeded sample response
- User sees notification: "Using cached suggestion. Set up Gemini API for real analysis."
- App never breaks - always shows something useful

### Testing Without Real APIs

To test without setting up APIs:
1. Leave API keys empty in `.env.local`
2. App automatically uses fallback/sample data
3. All features work normally with mock data

## 🔐 Security Best Practices

✅ **Never commit API keys** to GitHub
✅ **Use `.env.local`** for local development
✅ **Use Vercel Environment Variables** for production
✅ **API keys are NEXT_PUBLIC** (visible to client) - ok for external APIs
✅ **Firebase security rules** should be set to whitelist your domain

## 📝 Project Structure

```
.
├── app/
│   ├── page.tsx                 # Homepage with onboarding
│   ├── calendar/page.tsx        # Weekly content calendar
│   ├── captions/page.tsx        # Caption generator
│   ├── festivals/page.tsx       # Festival detector
│   ├── ads/page.tsx             # Ad recommendations
│   ├── dashboard/page.tsx       # Performance dashboard
│   ├── api/
│   │   ├── business-profile/    # API route
│   │   ├── weekly-calendar/     # API route
│   │   ├── captions/            # API route
│   │   ├── festivals/           # API route
│   │   ├── ad-recommendations/  # API route
│   │   └── performance/         # API route
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── Button.tsx               # Reusable button
│   ├── Card.tsx                 # Reusable card
│   └── Input.tsx                # Reusable input
├── lib/
│   ├── firebase.ts              # Firebase config
│   ├── gemini.ts                # Gemini API calls
│   └── fallbacks.ts             # Fallback data
├── .env.example                 # Example env file
├── .env.local                   # Local environment (Git ignored)
├── next.config.js               # Next.js config
├── tailwind.config.js           # Tailwind config
└── package.json                 # Dependencies
```

## 🧪 Testing Scenarios

### Test 1: Business Onboarding
```
Input: 
- Business: "Organic Tea Shop"
- Type: E-commerce
- Audience: Health-conscious millennials
- Location: India
- Products: Organic green, herbal, black teas

Expected: AI generates business profile with strengths, audience analysis, content pillars
```

### Test 2: Content Calendar
```
Input: Business profile from Test 1

Expected: 7-day calendar with:
- Tea appreciation posts
- Health benefits content
- Festival tie-ins
- Optimal posting times
```

### Test 3: Caption Generation
```
Input: "Premium organic oolong tea with jasmine flowers"

Expected: 3 caption variations with #YummyTea #OrganicLife #TeaLovers CTAs
```

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Guide](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Google Gemini API](https://aistudio.google.com)
- [Recharts](https://recharts.org)

## 📞 Support

**Email**: innovathon@nmims.edu
**Portal**: NMIMS Hackathon Portal
**Deadline**: March 19, 2026, 5 PM IST

## ⚖️ License & Disclaimer

- **Educational Purpose Only** for NMIMS INNOVATHON 2026
- **No Real Money Trading** - mock data only
- **Sample Data**: All metrics are simulated for demonstration
- **Not a Production Tool**: For learning and hackathon showcase only

## ✅ Submission Checklist

- [x] Working web app deployed to Vercel
- [x] GitHub repository with clean commit history
- [x] README with setup & usage instructions
- [x] Functional MVP covering 5+ core features
- [x] Live demo on 3 sample businesses
- [x] Code is readable and well-commented
- [x] No API keys in source code

## 🏆 Key Success Factors

1. **Good Prompt Engineering** - Quality prompts → Quality AI output
2. **Real Business Examples** - Use 2-3 actual small business profiles
3. **Festival Awareness** - India-specific content resonates better
4. **User-Friendly UX** - Non-technical users should navigate easily
5. **Demo Quality** - Show workflow from signup to recommendations
