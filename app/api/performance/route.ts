import { NextRequest, NextResponse } from 'next/server';
import { getFallbackPerformanceData } from '@/lib/fallbacks';

export async function GET(request: NextRequest) {
  try {
    // For MVP, return mock data based on simulated analytics
    const mockData = {
      lastUpdated: new Date().toISOString(),
      ...getFallbackPerformanceData(),
    };

    return NextResponse.json({
      success: true,
      data: mockData,
      isSimulated: true,
    });
  } catch (error: any) {
    console.error('Performance API Error:', error);
    
    return NextResponse.json({
      success: true,
      data: {
        totalReach: 0,
        totalEngagement: 0,
        engagementRate: 0,
      },
      isSimulated: true,
    });
  }
}
