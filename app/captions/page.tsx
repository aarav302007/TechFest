'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Link from 'next/link';

interface Caption {
  variation: number;
  caption: string;
  hashtags: string[];
  cta: string;
}

export default function CaptionsPage() {
  const [productDescription, setProductDescription] = useState('');
  const [brandTone, setBrandTone] = useState('professional');
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!productDescription.trim()) {
      alert('Please enter a product description');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/captions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productDescription,
          brandTone,
        }),
      });

      const result = await response.json();
      setCaptions(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate captions. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="gradient-success p-8 rounded-lg text-white">
        <h1 className="text-3xl font-bold mb-2">✍️ AI Caption Generator</h1>
        <p className="text-lg opacity-90">Generate engaging captions in your brand voice with hashtags & CTAs</p>
      </div>

      {/* Input Section */}
      <Card padding="lg" title="Create Captions">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product/Topic Description</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Describe your product or topic. Example: Organic hand-made soaps with essential oils, perfect for sensitive skin"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Tone</label>
            <select
              value={brandTone}
              onChange={(e) => setBrandTone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="professional">Professional & Formal</option>
              <option value="casual">Casual & Friendly</option>
              <option value="inspirational">Inspirational & Motivational</option>
              <option value="humorous">Humorous & Fun</option>
              <option value="educational">Educational & Informative</option>
            </select>
          </div>

          <Button
            variant="secondary"
            size="lg"
            onClick={handleGenerate}
            loading={loading}
            className="w-full"
          >
            Generate Captions
          </Button>
        </div>
      </Card>

      {/* Generated Captions */}
      {captions.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Generated Captions</h2>
          <div className="space-y-4">
            {captions.map((caption, idx) => (
              <Card
                key={idx}
                className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 card-hover"
                padding="md"
              >
                <div className="flex justify-between items-start gap-4 mb-3">
                  <h3 className="font-bold text-gray-900">Variation {caption.variation}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(caption.caption, idx)}
                  >
                    {copied === idx ? '✅ Copied!' : '📋 Copy'}
                  </Button>
                </div>

                <p className="text-gray-700 p-3 bg-white rounded border border-gray-200 mb-3 text-sm">
                  {caption.caption}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {caption.hashtags.map((tag, jdx) => (
                    <span key={jdx} className="badge-success">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">CTA:</span>
                  <span className="badge-warning">{caption.cta}</span>
                </div>
              </Card>
            ))}
          </div>

          <Card padding="lg" className="bg-blue-50 border-blue-200 mt-6">
            <h3 className="font-semibold text-gray-900 mb-2">💡 Tips for Best Results</h3>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>Choose variations based on your platform (Instagram, LinkedIn, Facebook)</li>
              <li>Customize hashtags based on trending topics in your industry</li>
              <li>A/B test different variations to see which performs best</li>
              <li>Adjust CTAs based on your marketing goals (Shop, Learn More, Sign Up, etc.)</li>
            </ul>
          </Card>
        </div>
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
