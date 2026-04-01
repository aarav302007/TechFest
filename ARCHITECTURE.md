# Architecture & Technical Design

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Next.js Frontend                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │        Pages & React Components                      │   │
│  │  - Homepage (Onboarding)                             │   │
│  │  - Calendar Page                                     │   │
│  │  - Captions Page                                     │   │
│  │  - Festivals Page                                    │   │
│  │  - Ads Page                                          │   │
│  │  - Dashboard Page                                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                    API Routes Layer                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  /api/business-profile    (POST)                    │   │
│  │  /api/weekly-calendar     (POST)                    │   │
│  │  /api/captions            (POST)                    │   │
│  │  /api/festivals           (GET)                     │   │
│  │  /api/ad-recommendations  (POST)                    │   │
│  │  /api/performance         (GET)                     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
         ↙                    ↓                      ↘
    ┌────────────┐    ┌──────────────┐    ┌──────────────┐
    │  Gemini    │    │   Firebase   │    │  Unsplash    │
    │    API     │    │  Firestore   │    │     API      │
    │ (AI Model) │    │   Storage    │    │ (Images)     │
    │            │    │              │    │              │
    │ 1M tokens/ │    │ 50K reads/   │    │ 50 req/      │
    │ day free   │    │ day free     │    │ hour free    │
    └────────────┘    └──────────────┘    └──────────────┘
```

---

## Data Flow

### 1. Business Profile Generation Flow

```
User Input
(Business Form)
    ↓
    └─→ POST /api/business-profile
         ↓
         ├─→ Call lib/gemini.ts
         │   └─→ generateBusinessProfile()
         │       ↓
         │       ├─→ Create Gemini Prompt
         │       ├─→ Call Gemini API
         │       │   ↓
         │       │   ├─ Success → Parse JSON → Return
         │       │   └─ Failure → Return Fallback Data
         │       └─→ Cache Response (1 hour)
         │
         └─→ Return Response to Frontend
              ↓
         Display Business Profile
         (Save to context for next steps)
```

### 2. Content Calendar Generation Flow

```
Business Profile (from previous step)
+ Optional Business Goals
    ↓
    └─→ POST /api/weekly-calendar
         ↓
         ├─→ Call generateWeeklyCalendar()
         │   ├─→ Check Cache (5 min)
         │   │   └─ Return cached if found
         │   ├─→ Create Gemini Prompt
         │   │   └─ "Generate 7-day calendar for: {business}"
         │   ├─→ Call Gemini API
         │   │   └─ Parse response JSON
         │   └─→ Cache response
         │
         └─→ Return Calendar Data
              ↓
         Display 7-Day Grid
         (Each day has content type, timing, idea)
```

### 3. Caption Generation Flow

```
Product Description
+ Brand Tone Selection
    ↓
    └─→ POST /api/captions
         ↓
         ├─→ Validate input
         ├─→ Check cache for same product
         ├─→ Call generateCaptions()
         │   ├─→ Create 3-variation prompt
         │   ├─→ Call Gemini API
         │   │   └─ Get 3 caption variations
         │   ├─→ Parse hashtags & CTAs
         │   └─→ Cache response
         │
         └─→ Return Captions Array
              ↓
         Display 3 Variations
         (Each with copy, hashtags, CTA)
```

---

## Component Architecture

### UI Component Hierarchy

```
RootLayout
├── Nav (Header)
├── main
│   ├── page.tsx (HomePage)
│   │   ├── Card (Business Onboarding)
│   │   ├── Button (Submit)
│   │   └── Navigation Links
│   │
│   ├── /calendar/page.tsx
│   │   ├── Card (Week Theme)
│   │   ├── Grid of Cards (Daily Plans)
│   │   └── Navigation
│   │
│   ├── /captions/page.tsx
│   │   ├── Input (Product Description)
│   │   ├── Select (Brand Tone)
│   │   ├── Button (Generate)
│   │   └── Card[] (Caption Variations)
│   │
│   ├── /festivals/page.tsx
│   │   ├── Card[] (Festival Cards)
│   │   └── Tips Section
│   │
│   ├── /ads/page.tsx
│   │   ├── Metric Cards (ROAS, CPC, etc.)
│   │   ├── Audience Segments
│   │   └── Creative Recommendations
│   │
│   └── /dashboard/page.tsx
│       ├── Metric Cards (KPIs)
│       ├── Recharts Components
│       │   ├── BarChart (Platform Performance)
│       │   ├── LineChart (Engagement Trend)
│       │   ├── PieChart (Content Type)
│       │   └── Various Charts
│       └── Insights Section
│
└── Footer

Components Used:
├── Button.tsx (Multiple buttons throughout)
├── Card.tsx (Layout framework for all sections)
├── Input.tsx (Form inputs)
└── Tailwind CSS (Styling)
```

---

## API Routes Architecture

### Route Configuration

Each route follows this pattern:

```typescript
// app/api/[feature]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateWithAI } from '@/lib/gemini';
import { getFallbackData } from '@/lib/fallbacks';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Call AI function
    const response = await generateWithAI(body.input);
    
    if (!response) {
      // Return fallback if API fails
      return NextResponse.json({
        success: true,
        data: getFallbackData(),
        isCache: true,
        message: 'Using fallback data'
      });
    }
    
    // Parse AI response
    const parsed = JSON.parse(response);
    
    return NextResponse.json({
      success: true,
      data: parsed,
      isCache: false
    });
    
  } catch (error) {
    console.error('API Error:', error);
    
    // Always return fallback on error
    return NextResponse.json({
      success: true,
      data: getFallbackData(),
      isCache: true,
      message: 'Error occurred, using fallback'
    });
  }
}
```

### Error Handling Strategy

```
API Call
├─ Success (200)
│  ├─ Valid JSON → Parse & Return
│  └─ Invalid JSON → Return Fallback
├─ Rate Limit (429)
│  └─ Return Cached or Fallback
├─ Server Error (500)
│  └─ Return Fallback
├─ Network Error
│  └─ Return Fallback
└─ Parse Error
   └─ Return Fallback
```

---

## Caching Strategy

### Where Caching Happens

```
1. Browser localStorage (Client-side)
   ├─ Cache duration: 1 hour
   ├─ Stores: Captions, Calendars, Profiles
   └─ Key format: "feature_businessname"

2. Function-level cache (Server-side RAM)
   ├─ Cache duration: Session
   ├─ Stores: Recent Gemini responses
   └─ Prevents duplicate API calls

3. Firebase cache (if implemented)
   ├─ Stores: User profiles, business data
   ├─ Duration: Until user clears
   └─ Syncs across sessions
```

### Cache Keys

```typescript
// Examples
"profile_brewhaven" → Business profile
"calendar_2024_week_1" → Weekly calendar
"captions_coffee_beans" → Captions for topic
"festivals_list" → Upcoming festivals
```

---

## State Management

### Context Flow

```
HomePage
├─ formData (useState)
│  └─ Form inputs
├─ businessProfile (useState)
│  └─ AI-generated profile
└─ submitted (useState)
   └─ Form submission state
   
When submitted:
└─ Pass businessProfile to next page
   via URL params (useSearchParams)
```

### URL Parameters

```
/calendar?profile={encoded_json}
/captions?profile={encoded_json}
/ads?profile={encoded_json}

Usage:
const profile = JSON.parse(
  decodeURIComponent(searchParams.get('profile'))
)
```

---

## Security Architecture

### API Keys Security

```
Development:
├─ Store in .env.local (Git ignored)
├─ Load via process.env.NEXT_PUBLIC_*
└─ Only for external APIs (safe to expose)

Production (Vercel):
├─ Store in Vercel Dashboard
├─ Auto-injected at build time
└─ Secrets tab for sensitive values if needed
```

### Firebase Security Rules

```
Default (restrictive):
match /databases/{database}/documents {
  match /{document=**} {
    allow read, write: if request.auth.uid != null;
  }
}

Demo/Development (open):
match /databases/{database}/documents {
  match /{document=**} {
    allow read, write;
  }
}
```

---

## Prompt Engineering

### Prompt Structure

Each Gemini prompt follows:

```
1. Role Definition
   "You are a [expert] in [domain]"

2. Task Description
   "Create [output] based on [inputs]"

3. Constraints
   "Keep under [limit]"
   "Format as [structure]"
   "For [audience]"

4. Input Data
   [Structured data]

5. Output Format
   "Return ONLY valid JSON:"
   {
     "field1": "...",
     "field2": [...]
   }
```

### Example Prompt

```javascript
const prompt = `You are a social media strategist.

Generate 3 caption variations for:
Product: ${productDescription}
Tone: ${brandTone}

Each caption should:
- Include 2-4 emojis
- Have 3-5 relevant hashtags
- Include a call-to-action
- Be under 280 characters
- Be optimized for Indian audience

Return ONLY valid JSON:
{
  "captions": [
    {
      "variation": 1,
      "caption": "...",
      "hashtags": [...],
      "cta": "..."
    }
  ]
}`;
```

---

## Deployment Architecture

### Local Development

```
npm run dev
├─ Starts Next.js dev server
├─ Hot reload on file changes
├─ Loads .env.local automatically
├─ Available at http://localhost:3000
└─ Watches for TypeScript errors
```

### Vercel Deployment

```
Git Repository (@GitHub)
        ↓
Vercel (Automatic Deploy)
├─ Detects Next.js
├─ Runs: npm install && npm run build
├─ Deploys to CDN
├─ URL: project.vercel.app
└─ Supports:
   - Environment variables
   - Auto-scaling
   - Edge functions (Optional)
```

### Build Process

```
npm run build
├─ Compiles TypeScript
├─ Bundles React components
├─ Optimizes images
├─ Generates .next folder
└─ Ready for production
```

---

## Performance Optimization

### Frontend Optimization

```
1. Code Splitting
   ├─ Next.js automatic route splitting
   ├─ Each page chunk loaded on demand
   └─ Reduces initial bundle size

2. Image Optimization
   ├─ next/image component
   ├─ Lazy loading
   ├─ Automatic WebP format
   └─ Responsive sizing

3. Caching
   ├─ Browser cache (CSS, JS)
   ├─ localStorage (API responses)
   ├─ Vercel edge caching
   └─ 1 hour cache duration

4. CSS Optimization
   ├─ Tailwind CSS purging
   ├─ Only bundle used classes
   ├─ ~30KB gzipped CSS
   └─ Autoprefixing for browsers
```

### API Optimization

```
1. Rate Limit Handling
   ├─10 API calls/minute guideline
   ├─ Implement caching
   ├─ Use fallback data
   └─ Queue requests

2. Response Caching
   ├─ Cache on success
   ├─ localStorage for client
   ├─ RAM for server
   └─ Reuse for same inputs

3. Error Handling
   ├─ Graceful degradation
   ├─ Instant fallback display
   ├─ User notification
   └─ No UI breakage
```

---

## Testing Architecture

### Unit Tests (Potential)

```typescript
// Test API route
describe('/api/captions', () => {
  it('should return 3 caption variations', async () => {
    const response = await fetch('/api/captions', {
      method: 'POST',
      body: JSON.stringify({
        productDescription: 'Coffee beans',
        brandTone: 'casual'
      })
    });
    
    const data = await response.json();
    expect(data.data).toHaveLength(3);
    expect(data.data[0]).toHaveProperty('caption');
  });
});
```

### Integration Tests

```typescript
// Test full flow
describe('User Journey', () => {
  it('should complete onboarding to dashboard', async () => {
    // 1. Fill form
    // 2. Submit business profile
    // 3. View calendar
    // 4. Generate captions
    // 5. Check dashboard
  });
});
```

---

## Scalability Considerations

### Current Limits (Free Tier)

```
Gemini API:
├─ 15 requests/minute
├─ 1M tokens/day
└─ 2 minutes response time

Firebase Firestore:
├─ 50K reads/day
├─ 20K writes/day
├─ 1GB storage
└─ 5GB/month traffic

Unsplash API:
├─ 50 requests/hour
└─ Unlimited bandwidth
```

### Scaling Path

```
Phase 1 (Current - MVP)
├─ All features work
├─ Fallback for rate limits
└─ ~5-10 active users

Phase 2 (Paid APIs)
├─ Upgrade Gemini to paid
├─ Premium Firebase plan
├─ Support 100+ users

Phase 3 (Enterprise)
├─ Self-hosted LLM
├─ Advanced caching
├─ Rate limiting per user
└─ Support 10,000+ users
```

---

## Technology Decision Matrix

| Decision | Choice | Why |
|----------|--------|-----|
| Framework | Next.js | Full-stack, zero-config, Vercel integration |
| Language | TypeScript | Type safety, better IDE support |
| Styling | Tailwind | Utility-first, rapid development, small bundle |
| UI Components | Custom + shadcn/ui | Full control, minimal dependencies |
| Charts | Recharts | React-native, responsive, lightweight |
| AI | Gemini | Free tier 1M tokens, fastest API |
| Database | Firebase | Real-time, free tier, easy setup |
| Images | Unsplash | 50M+ free images, no attribution required |
| Deployment | Vercel | Zero-config, auto-scaling, free tier |

---

## Conclusion

This architecture ensures:
- ✅ Reliability through redundancy (fallbacks)
- ✅ Performance through caching
- ✅ Scalability through API abstraction
- ✅ Security through environment separation
- ✅ Simplicity through managed services
