'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Link from 'next/link';

interface PerformanceData {
  totalReach: number;
  totalEngagement: number;
  engagementRate: number;
  topPost: { type: string; engagement: number; reach: number };
  platformMetrics: Record<string, { reach: number; engagement: number; rate: number }>;
  insights: string[];
}

export default function DashboardPage() {
  const [data, setData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/performance');
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching performance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card padding="lg" className="text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="animate-spin">⏳</span>
          <p>Loading performance dashboard...</p>
        </div>
      </Card>
    );
  }

  if (!data) {
    return <Card padding="lg">Failed to load data</Card>;
  }

  // Prepare chart data
  const platformChartData = Object.entries(data.platformMetrics).map(([platform, metrics]) => ({
    platform: platform,
    reach: metrics.reach,
    engagement: metrics.engagement,
    rate: parseFloat(metrics.rate.toFixed(2)),
  }));

  const engagementTrendData = [
    { day: 'Mon', engagement: 245 },
    { day: 'Tue', engagement: 389 },
    { day: 'Wed', engagement: 456 },
    { day: 'Thu', engagement: 378 },
    { day: 'Fri', engagement: 512 },
    { day: 'Sat', engagement: 681 },
    { day: 'Sun', engagement: 628 },
  ];

  const contentTypeData = [
    { name: 'Carousel', value: 35, color: '#3b82f6' },
    { name: 'Static Image', value: 28, color: '#10b981' },
    { name: 'Video', value: 22, color: '#f59e0b' },
    { name: 'Reel', value: 15, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="gradient-success p-8 rounded-lg text-white">
        <h1 className="text-3xl font-bold mb-2">📊 Performance Dashboard</h1>
        <p className="text-lg opacity-90">Track your social media growth and AI-driven insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-200 card-hover" padding="md">
          <p className="text-gray-600 text-sm">Total Reach</p>
          <p className="text-3xl font-bold text-blue-600">{data.totalReach.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-2">Last 7 days</p>
        </Card>
        <Card className="bg-green-50 border-green-200 card-hover" padding="md">
          <p className="text-gray-600 text-sm">Total Engagement</p>
          <p className="text-3xl font-bold text-green-600">{data.totalEngagement.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-2">Likes, Comments, Shares</p>
        </Card>
        <Card className="bg-purple-50 border-purple-200 card-hover" padding="md">
          <p className="text-gray-600 text-sm">Engagement Rate</p>
          <p className="text-3xl font-bold text-purple-600">{data.engagementRate.toFixed(2)}%</p>
          <p className="text-xs text-gray-500 mt-2">Engagement / Reach</p>
        </Card>
      </div>

      {/* Platform Performance */}
      <Card padding="lg">
        <h2 className="text-xl font-bold mb-4">Platform Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={platformChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="platform" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="reach" fill="#3b82f6" />
            <Bar dataKey="engagement" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {platformChartData.map((platform) => (
            <div key={platform.platform} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">{platform.platform}</h3>
              <div className="space-y-2 text-sm mt-2">
                <p>Reach: <span className="font-bold text-blue-600">{platform.reach.toLocaleString()}</span></p>
                <p>Engagement: <span className="font-bold text-green-600">{platform.engagement.toLocaleString()}</span></p>
                <p>Rate: <span className="font-bold text-purple-600">{platform.rate}%</span></p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Engagement Trend */}
      <Card padding="lg">
        <h2 className="text-xl font-bold mb-4">Weekly Engagement Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={engagementTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="engagement" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Content Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card padding="lg">
          <h2 className="text-xl font-bold mb-4">Content Type Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={contentTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {contentTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card padding="lg">
          <h2 className="text-xl font-bold mb-4">Top Performing Content</h2>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900">Highest Engagement</h3>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Type:</strong> {data.topPost.type}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Engagement:</strong> {data.topPost.engagement.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Reach:</strong> {data.topPost.reach.toLocaleString()}
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-gray-900">Recommended Action</h3>
              <p className="text-sm text-gray-600 mt-2">
                ✅ Focus on {data.topPost.type} content - they drive 3x more engagement
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* AI Insights */}
      <Card padding="lg" className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <h2 className="text-xl font-bold mb-4">🤖 AI-Powered Insights</h2>
        <ul className="space-y-3">
          {data.insights.map((insight, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-xl mt-1">💡</span>
              <p className="text-gray-700 pt-1">{insight}</p>
            </li>
          ))}
        </ul>
      </Card>

      {/* Recommendations */}
      <Card padding="lg" className="bg-blue-50 border-blue-200">
        <h2 className="text-xl font-bold mb-4">📋 Next Actions</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
          <li>Create more carousel posts (they outperform other formats)</li>
          <li>Post on weekends - Saturday & Sunday drive highest engagement</li>
          <li>Increase focus on educational content (converts 2.5x better)</li>
          <li>Schedule 3-5 posts per week across all platforms</li>
          <li>Engage with comments within first hour of posting</li>
          <li>Run promoted campaigns for top-performing posts</li>
        </ol>
      </Card>

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
        <Link href="/festivals">
          <Button variant="secondary" size="md" className="w-full">
            🎉 Festivals
          </Button>
        </Link>
      </div>
    </div>
  );
}
