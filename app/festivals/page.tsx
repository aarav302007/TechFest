'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Link from 'next/link';

interface Festival {
  name: string;
  date: string;
  daysAway: number;
  category: string;
  campaignIdea: string;
}

export default function FestivalsPage() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const response = await fetch('/api/festivals');
        const result = await response.json();
        setFestivals(result.data || []);
      } catch (error) {
        console.error('Error fetching festivals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFestivals();
  }, []);

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'Religious Festival':
        return 'bg-purple-100 text-purple-800';
      case 'National Holiday':
        return 'bg-orange-100 text-orange-800';
      case 'Regional Festival':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="gradient-primary p-8 rounded-lg text-white">
        <h1 className="text-3xl font-bold mb-2">🎉 Festival & Trend Detector</h1>
        <p className="text-lg opacity-90">Identify upcoming festivals and plan campaigns for maximum relevance</p>
      </div>

      {loading ? (
        <Card padding="lg" className="text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="animate-spin">⏳</span>
            <p>Loading upcoming festivals...</p>
          </div>
        </Card>
      ) : (
        <>
          {/* Festivals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {festivals.map((festival, idx) => (
              <Card
                key={idx}
                className="bg-gradient-to-br from-pink-50 to-red-50 border-pink-200 card-hover"
                padding="lg"
              >
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{festival.name}</h3>
                    <p className="text-sm text-gray-600">{festival.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-pink-600">{festival.daysAway}</div>
                    <p className="text-xs text-gray-600">days away</p>
                  </div>
                </div>

                <div className="mb-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadgeColor(festival.category)}`}>
                    {festival.category}
                  </span>
                </div>

                <div className="bg-white rounded border border-gray-200 p-3">
                  <p className="text-sm text-gray-700 font-medium mb-2">💡 Campaign Idea:</p>
                  <p className="text-sm text-gray-600">{festival.campaignIdea}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Planning Guide */}
          <Card padding="lg" className="bg-green-50 border-green-200">
            <h3 className="font-semibold text-gray-900 mb-3">📋 Festival Campaign Planning Guide</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <strong className="text-green-900">1-2 weeks before:</strong> Start planning content, create designs, write copy
              </div>
              <div>
                <strong className="text-green-900">3-5 days before:</strong> Tease the festival campaign on social media
              </div>
              <div>
                <strong className="text-green-900">Day of festival:</strong> Post frequently, engage with customers, offer special deals
              </div>
              <div>
                <strong className="text-green-900">Post-festival:</strong> Showcase customer testimonials, gather feedback, plan next campaign
              </div>
            </div>
          </Card>

          {/* Festival Marketing Tips */}
          <Card padding="lg" className="bg-blue-50 border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-3">🎯 India-Specific Festival Marketing Tips</h3>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li><strong>Use regional languages</strong> for better engagement in regional content</li>
              <li><strong>Respect cultural significance</strong> - align messaging with festival values</li>
              <li><strong>Create festival-specific offers</strong> - discounts, bundles, limited editions</li>
              <li><strong>Leverage tradition</strong> - incorporate traditional designs and colors</li>
              <li><strong>Partner with influencers</strong> - especially local/regional influencers</li>
              <li><strong>Plan ahead</strong> - Indians start shopping 2-3 weeks before major festivals</li>
              <li><strong>Multi-platform approach</strong> - Instagram, Facebook, WhatsApp, and YouTube</li>
            </ul>
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
        <Link href="/captions">
          <Button variant="secondary" size="md" className="w-full">
            ✍️ Captions
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
