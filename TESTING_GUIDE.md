# Sample Business Profiles for Testing

## Business Profile 1: Artisan Coffee Roastery

### Onboarding Input
- **Business Name**: Brew Haven Roastery
- **Business Type**: Food & Beverage / E-commerce
- **Location**: Bangalore, India
- **Target Audience**: Coffee enthusiasts, office workers, remote professionals (25-45 years)
- **Products/Services**: Fresh-roasted specialty coffee beans, coffee subscriptions, brewing equipment
- **Website**: https://brewhaven.example.com

### Expected AI Output
**Business Profile:**
- Industry: Specialty Coffee Retail
- Key Strengths: [Small-batch roasting, Sustainable sourcing, Unique blends]
- Content Pillars: [Coffee recipes, Roasting process education, Customer stories, Sustainability]
- Competitor Analysis: Main competitors are Nescafé and Blue Tokai with larger distribution
- Market Opportunity: Growing specialty coffee market in Indian metros, 40% YoY growth

### Content Calendar Highlights
- Mondays: Coffee & work motivation posts
- Wednesdays: Educational content (roasting, brewing tips)
- Fridays: New blend launches & weekend offers
- Saturdays: Customer testimonial features

### Caption Examples
✍️ "Morning mood activated ☕✨ Our single-origin Ethiopia Yirgacheffe brings you the perfect blend of fruity notes and buttery smoothness. Start your day right! #SpecialtyCoffee #CoffeeLovers #LocalBusiness"

---

## Business Profile 2: Women's Fashion Boutique

### Onboarding Input
- **Business Name**: Aara Fashion House
- **Business Type**: Retail / E-commerce
- **Location**: Mumbai, India
- **Target Audience**: Young women, fashion-forward professionals (20-35 years)
- **Products/Services**: Contemporary Indian wear, fusion fashion, handcrafted pieces
- **Website**: https://aarafashion.example.com

### Expected AI Output
**Business Profile:**
- Industry: Fashion Retail
- Key Strengths: [Sustainable fashion, Local artisan partnerships, Customization options]
- Content Pillars: [Styling tips, Behind-the-scenes, Festival collections, Customer features]
- Competitor Analysis: Local competitors vs. large e-commerce players
- Market Opportunity: ₹10,000+ crore Indian fashion market growing 25% annually

### Festival Opportunities
- **Diwali**: Festival collection showcase (Aug timing)
- **Wedding Season**: Bridal wear promotions (Oct-Dec)
- **Summer Collection**: Light materials and bright colors (Mar-May)

### Caption Examples
✍️ "Slay your own way 👑✨ Our latest fusion collection celebrates YOU - bold, beautiful, unapologetically you. Each piece tells a story of craftsmanship and sustainability. Limited stock! #FashionForward #SustainableStyle #SupportLocal"

---

## Business Profile 3: Tech Education Startup

### Onboarding Input
- **Business Name**: CodeMasters Academy
- **Business Type**: Education / SaaS
- **Location**: Delhi/NCR, India
- **Target Audience**: Students aged 15-25, career changers, tech enthusiasts
- **Products/Services**: Online coding bootcamps, AI/ML courses, certifications
- **Website**: https://codemasters.example.com

### Expected AI Output
**Business Profile:**
- Industry: EdTech
- Key Strengths: [Industry experts as instructors, 100% placement record, Self-paced learning]
- Content Pillars: [Career guidance, Tech news, Success stories, Learning tips]
- Competitor Analysis: Competing with Udemy, Coursera, local coaching centers
- Market Opportunity: ₹7,000+ crore Indian EdTech market, 35% annual growth

### Campaign Ideas
- **New Year**: "Upskill 2026" campaign
- **Placements**: Success story showcases
- **Tech News**: "Trending in Tech" weekly series
- **Scholarship Offers**: Summer coding bootcamp

### Caption Examples
✍️ "Your next career opportunity is one click away 🚀💻 Join 5000+ students who've landed their dream jobs. Start learning AI, Web Development, or Data Science today. Enroll & get 30% off! #CodeMasters #TechCareer #FutureReady"

---

## Testing Workflow

### Test Sequence

1. **Test Business 1: Brew Haven**
   ```
   Step 1: Go to homepage
   Step 2: Fill onboarding form with Coffee Roastery details
   Step 3: Click "Generate Business Profile"
   Wait for AI response (or fallback)
   Expected: Business profile page appears
   
   Step 4: Navigate to Weekly Calendar
   Expected: 7-day plan with coffee-related themes
   
   Step 5: Generate Captions
   Input: "Premium single-origin Ethiopian coffee beans"
   Expected: 3 caption variations about coffee
   
   Step 6: Check Festivals
   Expected: See relevant festivals and campaign ideas
   
   Step 7: View Ad Recommendations
   Expected: Audience suggestions for coffee enthusiasts
   
   Step 8: Check Dashboard
   Expected: Mock performance metrics and insights
   ```

2. **Test Business 2: Aara Fashion**
   ```
   Repeat similar workflow with fashion-specific data
   Focus on: Seasonal trends, festival campaigns, visual content
   ```

3. **Test Business 3: CodeMasters Academy**
   ```
   Repeat similar workflow with EdTech-specific data
   Focus on: Career guidance, placements, technical content
   ```

### Expected Outcomes

✅ All features work with sample data
✅ UI is responsive and intuitive
✅ API fallbacks work if Gemini fails
✅ Caching works (same request returns cached result)
✅ Data persists within session
✅ Mobile responsive design

---

## Manual Testing Checklist

- [ ] Business Onboarding Form validation works
- [ ] API calls succeed with real Gemini API
- [ ] API calls return fallback data if rate-limited
- [ ] Cached responses show "Using cached" notification
- [ ] All pages are accessible from navigation
- [ ] Mobile responsive on iPhone 12, Pixel 6
- [ ] Copy-to-clipboard works on captions
- [ ] Charts render correctly on dashboard
- [ ] Images load from Unsplash API
- [ ] No console errors
- [ ] .env.local is not committed to Git

---

## Demo Script (5 minutes)

**Opening Statement:**
"This is Zero-Touch Growth OS - an autonomous platform that replaces the need for a full-time social media manager. Let me show you how it works with a real business example."

**Demo Flow:**
1. Show homepage and explain problem
2. Onboard a sample business (Coffee Roastery)
3. Show AI-generated business profile
4. Jump to Weekly Calendar - point out festival awareness
5. Generate captions showing brand tone variations
6. Show Festival Detector with campaign ideas
7. Quick look at Ad Recommendations
8. End with Dashboard showing analytics
9. Conclude: "All these features, without hiring anyone. Zero-touch growth."

**Time Allocation:**
- Homepage & Onboarding: 1 min
- Business Profile: 30 sec
- Calendar & Captions: 1 min
- Festivals & Ads: 1 min
- Dashboard: 1 min
- Wrap-up: 30 sec
