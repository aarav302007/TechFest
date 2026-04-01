import axios from 'axios';
import { cacheResponse, getCachedResponse } from './fallbacks';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

interface GeminiRequest {
  contents: Array<{
    parts: Array<{ text: string }>;
  }>;
  generationConfig?: {
    temperature?: number;
    maxOutputTokens?: number;
  };
}

export const callGeminiAPI = async (prompt: string, cacheKey?: string): Promise<string> => {
  // Check cache first
  if (cacheKey) {
    const cached = getCachedResponse(cacheKey);
    if (cached) {
      console.log('Using cached response for:', cacheKey);
      return cached;
    }
  }

  if (!GEMINI_API_KEY) {
    console.warn('Gemini API key not configured');
    return '';
  }

  try {
    const payload: GeminiRequest = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    };

    const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, payload, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const content = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Cache the response
    if (cacheKey && content) {
      cacheResponse(cacheKey, content);
    }

    return content;
  } catch (error: any) {
    console.error('Gemini API Error:', error.response?.status, error.message);
    if (error.response?.status === 429) {
      console.warn('Rate limit reached - using fallback');
    }
    throw error;
  }
};

export const generateBusinessProfile = async (input: {
  websiteUrl?: string;
  businessName: string;
  businessType: string;
  targetAudience: string;
  location: string;
  productsServices: string;
}) => {
  const prompt = `You are a marketing intelligence expert. Analyze the following business and provide a structured business profile:

Business Name: ${input.businessName}
Type: ${input.businessType}
Location: ${input.location}
Target Audience: ${input.targetAudience}
Products/Services: ${input.productsServices}
${input.websiteUrl ? `Website: ${input.websiteUrl}` : ''}

Provide a JSON response with these exact keys:
{
  "businessName": "name",
  "industry": "industry",
  "targetAudience": "detailed audience description",
  "location": "location",
  "keyStrengths": ["strength1", "strength2"],
  "contentPillars": ["pillar1", "pillar2"],
  "competitorAnalysis": "brief analysis",
  "marketOpportunity": "opportunity description"
}

Return ONLY valid JSON, no markdown or extra text.`;

  const cacheKey = `profile_${input.businessName.replace(/\s+/g, '_')}`;
  return callGeminiAPI(prompt, cacheKey);
};

export const generateWeeklyCalendar = async (input: {
  businessProfile: string;
  businessGoals?: string;
}) => {
  const prompt = `You are a social media strategist specializing in Indian market content. Based on this business profile:

${input.businessProfile}

${input.businessGoals ? `Business Goals: ${input.businessGoals}` : ''}

Generate a 7-day content calendar considering:
- Upcoming festivals (Diwali, Valentine's Day, etc. depending on season)
- Trending topics in India
- Audience engagement patterns
- India-specific holidays and occasions

Provide a JSON response with this exact structure:
{
  "week": "date range",
  "theme": "weekly theme",
  "upcomingFestivals": ["festival1", "festival2"],
  "contentCalendar": [
    {
      "day": "Monday",
      "theme": "theme",
      "contentType": "type",
      "bestTime": "HH:MM",
      "idea": "specific content idea"
    }
  ]
}

Return ONLY valid JSON, no markdown.`;

  const cacheKey = `calendar_${Date.now()}`;
  return callGeminiAPI(prompt, cacheKey);
};

export const generateCaptions = async (productDescription: string, brandTone: string = 'professional') => {
  const prompt = `You are a copywriter expert in creating engaging social media captions for Indian audiences.

Product/Topic: ${productDescription}
Brand Tone: ${brandTone}

Create 3 caption variations optimized for social media engagement. Each should:
- Include relevant emojis
- Have 3-5 hashtags
- Include a call-to-action
- Be appropriate for the Indian market
- Be under 280 characters

Provide a JSON response with this exact structure:
{
  "captions": [
    {
      "variation": 1,
      "caption": "caption text",
      "hashtags": ["tag1", "tag2"],
      "cta": "Call to action"
    }
  ]
}

Return ONLY valid JSON, no markdown.`;

  const cacheKey = `captions_${productDescription.substring(0, 30).replace(/\s+/g, '_')}`;
  return callGeminiAPI(prompt, cacheKey);
};

export const detectFestivals = async () => {
  const prompt = `You are an expert in Indian festivals and holidays. List upcoming festivals and occasions in India for the next 30 days that are relevant for social media marketing.

For each festival, provide:
- Name
- Date
- Category (Religious, National, Regional, Cultural, etc.)
- Marketing campaign idea specific to businesses in India

Provide a JSON response with this exact structure:
{
  "festivals": [
    {
      "name": "festival name",
      "date": "date",
      "daysAway": "number",
      "category": "category",
      "campaignIdea": "specific marketing idea for Indian businesses"
    }
  ]
}

Return ONLY valid JSON, no markdown.`;

  const cacheKey = 'festivals_list';
  return callGeminiAPI(prompt, cacheKey);
};

export const generateAdRecommendations = async (businessProfile: string) => {
  const prompt = `You are a performance marketing expert for Indian audience. Based on this business profile:

${businessProfile}

Provide ad recommendations including:
1. Target audience segments with estimated sizes
2. Recommended creative types
3. Expected performance metrics
4. Suggested budget allocation

Provide a JSON response with this exact structure:
{
  "recommendedAudiences": [
    {
      "id": "aud_1",
      "description": "audience description",
      "estimatedSize": "size",
      "expectedCTR": "percentage",
      "suggestedBudget": "amount"
    }
  ],
  "suggestedCreatives": ["creative1", "creative2"],
  "estimatedMetrics": {
    "reachPerDay": "number",
    "expectedConversions": "number",
    "averageROAS": "number",
    "estimatedCPC": "amount"
  }
}

Return ONLY valid JSON, no markdown.`;

  const cacheKey = `ads_${businessProfile.substring(0, 20).replace(/\s+/g, '_')}`;
  return callGeminiAPI(prompt, cacheKey);
};
