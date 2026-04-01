import { NextRequest, NextResponse } from 'next/server';
import { generateAdRecommendations } from '@/lib/gemini';
import { getFallbackAdRecommendations } from '@/lib/fallbacks';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await generateAdRecommendations(body.businessProfile);

    if (!response) {
      return NextResponse.json({
        success: true,
        data: getFallbackAdRecommendations(),
        isCache: true,
        message: 'Using sample recommendations. Set up Gemini API for AI analysis.',
      });
    }

    const parsed = JSON.parse(response);
    return NextResponse.json({
      success: true,
      data: parsed,
      isCache: false,
    });
  } catch (error: any) {
    console.error('Ad Recommendations API Error:', error);
    
    return NextResponse.json({
      success: true,
      data: getFallbackAdRecommendations(),
      isCache: true,
      message: 'Using fallback recommendations',
    });
  }
}
