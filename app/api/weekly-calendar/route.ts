import { NextRequest, NextResponse } from 'next/server';
import { generateWeeklyCalendar } from '@/lib/gemini';
import { getFallbackWeeklyCalendar } from '@/lib/fallbacks';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await generateWeeklyCalendar({
      businessProfile: body.businessProfile,
      businessGoals: body.businessGoals,
    });

    if (!response) {
      return NextResponse.json({
        success: true,
        data: getFallbackWeeklyCalendar(),
        isCache: true,
        message: 'Using sample calendar. Set up Gemini API for AI-generated content.',
      });
    }

    const parsed = JSON.parse(response);
    return NextResponse.json({
      success: true,
      data: parsed,
      isCache: false,
    });
  } catch (error: any) {
    console.error('Weekly Calendar API Error:', error);
    
    return NextResponse.json({
      success: true,
      data: getFallbackWeeklyCalendar(),
      isCache: true,
      message: 'Using fallback calendar',
    });
  }
}
