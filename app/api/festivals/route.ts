import { NextRequest, NextResponse } from 'next/server';
import { detectFestivals } from '@/lib/gemini';
import { getFallbackFestivals } from '@/lib/fallbacks';

export async function GET(request: NextRequest) {
  try {
    const response = await detectFestivals();

    if (!response) {
      return NextResponse.json({
        success: true,
        data: getFallbackFestivals(),
        isCache: true,
        message: 'Using sample festivals. Set up Gemini API for real-time data.',
      });
    }

    const parsed = JSON.parse(response);
    return NextResponse.json({
      success: true,
      data: parsed.festivals || getFallbackFestivals(),
      isCache: false,
    });
  } catch (error: any) {
    console.error('Festivals API Error:', error);
    
    return NextResponse.json({
      success: true,
      data: getFallbackFestivals(),
      isCache: true,
      message: 'Using fallback festival data',
    });
  }
}
