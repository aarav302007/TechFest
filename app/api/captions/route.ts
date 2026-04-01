import { NextRequest, NextResponse } from 'next/server';
import { generateCaptions } from '@/lib/gemini';
import { getFallbackCaptions } from '@/lib/fallbacks';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await generateCaptions(
      body.productDescription,
      body.brandTone || 'professional'
    );

    if (!response) {
      return NextResponse.json({
        success: true,
        data: getFallbackCaptions(body.productDescription),
        isCache: true,
        message: 'Using sample captions. Set up Gemini API for AI-generated content.',
      });
    }

    const parsed = JSON.parse(response);
    return NextResponse.json({
      success: true,
      data: parsed.captions || getFallbackCaptions(body.productDescription),
      isCache: false,
    });
  } catch (error: any) {
    console.error('Captions API Error:', error);
    
    return NextResponse.json({
      success: true,
      data: getFallbackCaptions(body.productDescription),
      isCache: true,
      message: 'Using fallback captions',
    });
  }
}
