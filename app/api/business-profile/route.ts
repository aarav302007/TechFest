import { NextRequest, NextResponse } from 'next/server';
import { generateBusinessProfile } from '@/lib/gemini';
import { getFallbackBusinessProfile } from '@/lib/fallbacks';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await generateBusinessProfile({
      businessName: body.businessName,
      businessType: body.businessType,
      targetAudience: body.targetAudience,
      location: body.location,
      productsServices: body.productsServices,
      websiteUrl: body.websiteUrl,
    });

    if (!response) {
      return NextResponse.json({
        success: true,
        data: getFallbackBusinessProfile(),
        isCache: true,
        message: 'Using sample business profile. Set up Gemini API for real analysis.',
      });
    }

    const parsed = JSON.parse(response);
    return NextResponse.json({
      success: true,
      data: parsed,
      isCache: false,
    });
  } catch (error: any) {
    console.error('Business Profile API Error:', error);
    
    // Return fallback on error
    return NextResponse.json({
      success: true,
      data: getFallbackBusinessProfile(),
      isCache: true,
      message: 'Rate limit or API issue - using fallback data',
    });
  }
}
