'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Link from 'next/link';

interface CalendarDay {
  day: string;
  theme: string;
  contentType: string;
  bestTime: string;
  idea: string;
}

interface Calendar {
  week: string;
  theme: string;
  upcomingFestivals: string[];
  contentCalendar: CalendarDay[];
}

export default function CalendarPage() {
  const searchParams = useSearchParams();
  const [calendar, setCalendar] = useState<Calendar | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const profileStr = searchParams.get('profile');
        const profile = profileStr ? JSON.parse(decodeURIComponent(profileStr)) : null;

        const response = await fetch('/api/weekly-calendar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            businessProfile: profile || 'Sample business',
            businessGoals: 'Growth and engagement',
          }),
        });

        const result = await response.json();
        setCalendar(result.data);
      } catch (error) {
        console.error('Error fetching calendar:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, [searchParams]);

  if (loading) {
    return (
      <Card padding="lg" className="text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="animate-spin">⏳</span>
          <p>Generating your AI-powered content calendar...</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="gradient-primary p-8 rounded-lg text-white">
        <h1 className="text-3xl font-bold mb-2">📅 Weekly Content Calendar</h1>
        <p className="text-lg opacity-90">AI-generated 7-day plan aligned with festivals and trends</p>
      </div>

      {calendar && (
        <>
          {/* Calendar Info */}
          <Card padding="lg" title={calendar.theme}>
            <div className="space-y-3">
              <p><strong>Week:</strong> {calendar.week}</p>
              {calendar.upcomingFestivals.length > 0 && (
                <div>
                  <strong>🎉 Upcoming Festivals:</strong>
                  <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                    {calendar.upcomingFestivals.map((festival, idx) => (
                      <li key={idx}>{festival}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>

          {/* Daily Content Plans */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Daily Content Plan</h2>
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-2">
              {calendar.contentCalendar.map((day, idx) => (
                <Card
                  key={idx}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 border-indigo-200 card-hover"
                  padding="md"
                >
                  <h3 className="font-bold text-gray-900 mb-2">{day.day}</h3>
                  <div className="text-sm space-y-2">
                    <div>
                      <span className="badge-success">{day.contentType}</span>
                    </div>
                    <p className="text-gray-700"><strong>Theme:</strong> {day.theme}</p>
                    <p className="text-gray-700"><strong>Best Time:</strong> {day.bestTime}</p>
                    <p className="text-gray-700">{day.idea}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Content Tips */}
          <Card padding="lg" className="bg-yellow-50 border-yellow-200">
            <h3 className="font-semibold text-gray-900 mb-2">💡 Content Tips</h3>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>Post during the recommended best times for maximum engagement</li>
              <li>Mix content types throughout the week to keep audience interested</li>
              <li>Align content with upcoming festivals for seasonal relevance</li>
              <li>Use the content pillars for consistency in messaging</li>
              <li>Schedule posts in advance using social media management tools</li>
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
        <Link href="/captions">
          <Button variant="secondary" size="md" className="w-full">
            ✍️ Captions
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
