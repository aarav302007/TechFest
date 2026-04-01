'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Link from 'next/link';

interface AudienceSegment {
  id: string;
  description: string;
  estimatedSize: string;
  expectedCTR: string;
  suggestedBudget: string;
}

interface AdRecommendations {
  recommendedAudiences: AudienceSegment[];
  suggestedCreatives: string[];
  estimatedMetrics: {
    reachPerDay: string;
    expectedConversions: string;
    averageROAS: string;
    estimatedCPC: string;
  };
}

export default function AdsPage() {
  const searchParams = useSearchParams();
  const [recommendations, setRecommendations] = useState<AdRecommendations | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const profileStr = searchParams.get('profile');
        const profile = profileStr ? JSON.parse(decodeURIComponent(profileStr)) : null;

        const response = await fetch('/api/ad-recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            businessProfile: profile || 'Sample business',
          }),
        });

        const result = await response.json();
        setRecommendations(result.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [searchParams]);

  if (loading) {
    return (
      <Card padding="lg" className="text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="animate-spin">⏳</span>
          <p>Generating ad recommendations...</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="gradient-primary p-8 rounded-lg text-white">
        <h1 className="text-3xl font-bold mb-2">📢 Ad Recommendation Engine</h1>
        <p className="text-lg opacity-90">Mock AI-powered ad targeting and optimization recommendations</p>
      </div>

      {recommendations && (
        <>
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-blue-50 border-blue-200 card-hover" padding="md">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {recommendations.estimatedMetrics.reachPerDay}
              </div>
              <p className="text-sm text-gray-600">Estimated Daily Reach</p>
            </Card>
            <Card className="bg-green-50 border-green-200 card-hover" padding="md">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {recommendations.estimatedMetrics.expectedConversions}
              </div>
              <p className="text-sm text-gray-600">Expected Conversions</p>
            </Card>
            <Card className="bg-purple-50 border-purple-200 card-hover" padding="md">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {recommendations.estimatedMetrics.averageROAS}
              </div>
              <p className="text-sm text-gray-600">Average ROAS</p>
            </Card>
            <Card className="bg-orange-50 border-orange-200 card-hover" padding="md">
              <div className="text-2xl font-bold text-orange-600 mb-2">
                {recommendations.estimatedMetrics.estimatedCPC}
              </div>
              <p className="text-sm text-gray-600">Estimated CPC</p>
            </Card>
          </div>

          {/* Recommended Audiences */}
          <Card padding="lg">
            <h2 className="text-xl font-bold mb-4">🎯 Recommended Audience Segments</h2>
            <div className="space-y-3">
              {recommendations.recommendedAudiences.map((audience) => (
                <div
                  key={audience.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{audience.description}</h3>
                    <span className="badge-success">{audience.id}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Estimated Size</p>
                      <p className="font-bold text-gray-900">{audience.estimatedSize}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Expected CTR</p>
                      <p className="font-bold text-blue-600">{audience.expectedCTR}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Suggested Budget</p>
                      <p className="font-bold text-green-600">{audience.suggestedBudget}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Creative Recommendations */}
          <Card padding="lg" className="bg-indigo-50 border-indigo-200">
            <h2 className="text-xl font-bold mb-4">🎨 Recommended Creative Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recommendations.suggestedCreatives.map((creative, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-4 border border-indigo-200 flex items-start gap-3"
                >
                  <span className="text-xl">✨</span>
                  <p className="text-gray-700">{creative}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Ad Strategy Guide */}
          <Card padding="lg" className="bg-yellow-50 border-yellow-200">
            <h3 className="font-semibold text-gray-900 mb-3">📋 Ad Strategy Guide</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <strong>Step 1: Select Audiences</strong> - Start with your primary audience segment and allocate 50% of budget there
              </div>
              <div>
                <strong>Step 2: Test Creatives</strong> - Create 3-5 variations of each recommended creative type
              </div>
              <div>
                <strong>Step 3: Set Campaign Goals</strong> - Choose between Reach, Traffic, Conversions, or Engagement
              </div>
              <div>
                <strong>Step 4: Monitor Performance</strong> - Check metrics daily, pause underperforming ads
              </div>
              <div>
                <strong>Step 5: Optimize Budget</strong> - Shift budget toward winning audience/creative combinations
              </div>
              <div>
                <strong>Step 6: Scale Winners</strong> - Once winning combination identified, increase budget gradually
              </div>
            </div>
          </Card>

          {/* Important Notes */}
          <Card padding="lg" className="bg-red-50 border-red-200">
            <h3 className="font-semibold text-red-900 mb-2">⚠️ Important Notes</h3>
            <p className="text-sm text-red-800">
              This is a MOCK recommendation engine showing simulated data for demonstration only. 
              For real ad campaigns, integrate with actual Meta Ads Manager or Google Ads API. 
              All metrics shown are estimates and may vary significantly based on actual market conditions and platform algorithms.
            </p>
          </Card>
        </>
      )}

      {/* Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Link href="/">
          <Button variant="outline" size="md" className="w-full">
            🏠 Home
          </Button>
        </Link>
        <Link href="/calendar">
          <Button variant="secondary" size="md" className="w-full">
            📅 Calendar
          </Button>
        </Link>
        <Link href="/festivals">
          <Button variant="secondary" size="md" className="w-full">
            🎉 Festivals
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="secondary" size="md" className="w-full">
            📊 Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
