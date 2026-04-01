// Fallback in-memory cache for API responses
const responseCache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 3600000; // 1 hour

export const cacheResponse = (key: string, data: any) => {
  responseCache[key] = {
    data,
    timestamp: Date.now(),
  };
};

export const getCachedResponse = (key: string) => {
  const cached = responseCache[key];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

// Default fallback responses for rate limiting scenarios
export const getFallbackBusinessProfile = () => ({
  businessName: 'Sample Business',
  industry: 'Retail',
  targetAudience: 'Young professionals aged 25-40',
  location: 'India',
  keyStrengths: ['Quality products', 'Customer service', 'Local presence'],
  contentPillars: ['Product highlights', 'Customer testimonials', 'Seasonal offers'],
  competitorAnalysis: 'Main competitors are national chains with lower personalization',
  marketOpportunity: 'Growing demand for local, personalized shopping experiences',
});

export const getFallbackWeeklyCalendar = () => ({
  week: 'April 1-7, 2026',
  theme: 'Spring Festival & New Beginnings',
  upcomingFestivals: ['Ram Navami (April 17)', 'Mahavir Jayanti (April 21)'],
  contentCalendar: [
    {
      day: 'Monday',
      theme: 'Monday Motivation',
      contentType: 'Inspirational Quote + Product',
      bestTime: '9:00 AM',
      idea: 'Share weekly business insights with product tie-in',
    },
    {
      day: 'Tuesday',
      theme: 'Product Spotlight',
      contentType: 'Carousel',
      bestTime: '2:00 PM',
      idea: 'Showcase top 3 products with detailed features',
    },
    {
      day: 'Wednesday',
      theme: 'Educational Content',
      contentType: 'Infographic',
      bestTime: '10:00 AM',
      idea: 'How-to guide or industry tips relevant to your business',
    },
    {
      day: 'Thursday',
      theme: 'Customer Spotlight',
      contentType: 'Testimonial',
      bestTime: '3:00 PM', 
      idea: 'Feature a customer story or success case',
    },
    {
      day: 'Friday',
      theme: 'Weekend Prep',
      contentType: 'Static Image + CTA',
      bestTime: '4:00 PM',
      idea: 'Weekend offer or upcoming event promotion',
    },
    {
      day: 'Saturday',
      theme: 'Weekend Special',
      contentType: 'Video Teaser',
      bestTime: '11:00 AM',
      idea: 'Behind-the-scenes or weekend exclusive content',
    },
    {
      day: 'Sunday',
      theme: 'Community Building',
      contentType: 'Question + Poll',
      bestTime: '6:00 PM',
      idea: 'Engage audience with interactive questions',
    },
  ],
});

export const getFallbackCaptions = (topic: string) => [
  {
    variation: 1,
    caption: `Discover the magic of quality with us! ✨ ${topic ? `Perfect for ${topic}` : 'Your trusted choice for excellence'}. Join thousands of satisfied customers today 🎯 #Quality #Trust #LocalBusiness`,
    hashtags: ['#LocalBusiness', '#Quality', '#CustomerFirst', '#India'],
    cta: 'Shop Now',
  },
  {
    variation: 2,
    caption: `Why settle for ordinary? 🚀 Experience extraordinary quality and service. ${topic ? `Transform your ${topic} experience` : 'We deliver excellence every single day'}. Limited time offer! ⏰ #Exclusive #BestChoice`,
    hashtags: ['#Exclusive', '#BestChoice', '#Premium', '#OfferAlert'],
    cta: 'Explore Now',
  },
  {
    variation: 3,
    caption: `Your satisfaction is our mission 💯 ${topic ? `Looking for best ${topic}?` : 'Looking for the best?'} We've got you covered with top-quality products and unbeatable service. Join us! 🎉 #satisfaction #Excellence`,
    hashtags: ['#Satisfaction', '#Excellence', '#Community', '#CustomerLove'],
    cta: 'Get Started',
  },
];

export const getFallbackFestivals = () => [
  {
    name: 'Ram Navami',
    date: 'April 17, 2026',
    daysAway: 16,
    category: 'Religious Festival',
    campaignIdea: 'Celebrate with special offers, use traditional colors in designs, tie products to celebration theme',
  },
  {
    name: 'Mahavir Jayanti',
    date: 'April 21, 2026',
    daysAway: 20,
    category: 'Religious Festival',
    campaignIdea: 'Share inspirational content, focus on values-driven messaging, community giving',
  },
  {
    name: 'Vishu (Kerala)',
    date: 'April 14, 2026',
    daysAway: 13,
    category: 'Regional Festival',
    campaignIdea: 'Target audience in Kerala/South India, use specific color schemes, regional language variations',
  },
];

export const getFallbackAdRecommendations = () => ({
  recommendedAudiences: [
    {
      id: 'aud_1',
      description: 'Young professionals (25-40) in metros',
      estimatedSize: '2.5M',
      expectedCTR: '2.8%',
      suggestedBudget: '₹5,000',
    },
    {
      id: 'aud_2',
      description: 'Homemakers interested in quality products',
      estimatedSize: '4.2M',
      expectedCTR: '3.2%',
      suggestedBudget: '₹7,500',
    },
    {
      id: 'aud_3',
      description: 'Business owners & entrepreneurs',
      estimatedSize: '800K',
      expectedCTR: '4.1%',
      suggestedBudget: '₹10,000',
    },
  ],
  suggestedCreatives: [
    'Testimonials with real customer faces',
    'Before-after comparison visuals',
    'Educational carousel content',
    'Limited-time offer banners',
  ],
  estimatedMetrics: {
    reachPerDay: '150K-200K',
    expectedConversions: '3,000-4,500',
    averageROAS: '2.5-3.2',
    estimatedCPC: '₹8-12',
  },
});

export const getFallbackPerformanceData = () => ({
  totalReach: 127504,
  totalEngagement: 3642,
  engagementRate: 2.86,
  topPost: {
    type: 'Carousel',
    engagement: 456,
    reach: 8934,
  },
  platformMetrics: {
    instagram: { reach: 45000, engagement: 1200, rate: 2.67 },
    linkedin: { reach: 35000, engagement: 1800, rate: 5.14 },
    facebook: { reach: 47504, engagement: 642, rate: 1.35 },
  },
  insights: [
    'Carousel posts perform 3x better than static images',
    'Best posting time is 2-3 PM on weekdays',
    'Testimonial content drives 40% more engagement',
    'Educational content converts 2.5x better than promotional content',
  ],
});
