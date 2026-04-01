'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Card from '@/components/Card';

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    targetAudience: '',
    location: '',
    productsServices: '',
    websiteUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [businessProfile, setBusinessProfile] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/business-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setBusinessProfile(result.data);
      setSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="gradient-primary p-8 rounded-lg text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome to Zero-Touch Growth OS</h2>
        <p className="text-lg opacity-90">
          The autonomous digital growth platform that replaces the need for a full-time social media manager
        </p>
      </div>

      {/* Feature Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-blue-50 border-blue-200 card-hover">
          <div className="text-3xl mb-2">📊</div>
          <h3 className="font-semibold text-gray-900">Business Intelligence</h3>
          <p className="text-sm text-gray-600 mt-2">AI-powered analysis of your business and market</p>
        </Card>
        <Card className="bg-green-50 border-green-200 card-hover">
          <div className="text-3xl mb-2">📅</div>
          <h3 className="font-semibold text-gray-900">Content Planning</h3>
          <p className="text-sm text-gray-600 mt-2">7-day intelligent calendar with trending content</p>
        </Card>
        <Card className="bg-purple-50 border-purple-200 card-hover">
          <div className="text-3xl mb-2">✨</div>
          <h3 className="font-semibold text-gray-900">Content Generation</h3>
          <p className="text-sm text-gray-600 mt-2">AI-generated captions, images, and campaigns</p>
        </Card>
      </div>

      {/* Main Content */}
      {!submitted ? (
        <Card padding="lg" title="Step 1️⃣ : Business Onboarding" description="Tell us about your business to get started">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Business Name"
              name="businessName"
              placeholder="Enter your business name"
              value={formData.businessName}
              onChange={handleChange}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select business type</option>
                <option value="Retail">Retail</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Services">Services</option>
                <option value="Software">Software/SaaS</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <Input
              label="Target Audience"
              name="targetAudience"
              placeholder="e.g., Young professionals, homemakers, entrepreneurs"
              value={formData.targetAudience}
              onChange={handleChange}
              helperText="Who do you want to reach?"
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select primary location</option>
                <option value="All India">All India</option>
                <option value="North India">North India</option>
                <option value="South India">South India</option>
                <option value="East India">East India</option>
                <option value="West India">West India</option>
                <option value="Delhi/NCR">Delhi/NCR</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>

            <Input
              label="Products/Services"
              name="productsServices"
              placeholder="What do you sell or offer?"
              value={formData.productsServices}
              onChange={handleChange}
              required
            />

            <Input
              label="Website URL (Optional)"
              name="websiteUrl"
              placeholder="https://example.com"
              value={formData.websiteUrl}
              onChange={handleChange}
              type="url"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              {loading ? 'Analyzing Your Business...' : 'Generate Business Profile'}
            </Button>
          </form>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card padding="lg" className="bg-green-50 border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">✅</span>
              <h3 className="text-xl font-bold text-green-900">Business Profile Generated!</h3>
            </div>
            
            <div className="space-y-2 mb-6">
              <p><strong>Business:</strong> {businessProfile?.businessName || formData.businessName}</p>
              <p><strong>Industry:</strong> {businessProfile?.industry}</p>
              <p><strong>Target Audience:</strong> {businessProfile?.targetAudience}</p>
              <p><strong>Key Strengths:</strong> {businessProfile?.keyStrengths?.join(', ')}</p>
              <p><strong>Content Pillars:</strong> {businessProfile?.contentPillars?.join(', ')}</p>
            </div>

            <Button
              onClick={() => setSubmitted(false)}
              variant="outline"
              size="sm"
            >
              Edit Profile
            </Button>
          </Card>

          {/* Navigation to Other Features */}
          <Card padding="lg" title="Next Steps" description="Continue with AI-powered growth tools">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href={`/calendar?profile=${encodeURIComponent(JSON.stringify(businessProfile || formData))}`}>
                <Button variant="secondary" size="lg" className="w-full justify-start">
                  📅 Generate Weekly Calendar
                </Button>
              </Link>

              <Link href={`/captions?profile=${encodeURIComponent(JSON.stringify(businessProfile || formData))}`}>
                <Button variant="secondary" size="lg" className="w-full justify-start">
                  ✍️ Generate Captions
                </Button>
              </Link>

              <Link href="/festivals">
                <Button variant="secondary" size="lg" className="w-full justify-start">
                  🎉 Festival Detector
                </Button>
              </Link>

              <Link href={`/ads?profile=${encodeURIComponent(JSON.stringify(businessProfile || formData))}`}>
                <Button variant="secondary" size="lg" className="w-full justify-start">
                  📢 Ad Recommendations
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button variant="secondary" size="lg" className="w-full justify-start">
                  📊 Performance Dashboard
                </Button>
              </Link>

              <Link href="/">
                <Button variant="outline" size="lg" className="w-full justify-start">
                  🏠 Start Over
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      )}

      {/* Info Section */}
      <Card padding="lg" className="bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-2">💡 How It Works</h3>
        <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
          <li>Tell us about your business (you're here!)</li>
          <li>AI generates a 7-day content calendar aligned with festivals & trends</li>
          <li>Get AI-written captions in your brand tone with hashtags & CTAs</li>
          <li>Discover upcoming festivals for campaign ideas</li>
          <li>Get intelligent ad targeting recommendations</li>
          <li>Track performance with AI-powered insights</li>
        </ol>
      </Card>
    </div>
  );
}
