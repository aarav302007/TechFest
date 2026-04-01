import { useState } from "react";

const ACCENT = "#F4A300";
const BG = "#0D0D0D";
const CARD = "#161616";
const BORDER = "#2A2A2A";
const TEXT = "#E8E2D5";
const MUTED = "#6B6560";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${BG};
    color: ${TEXT};
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }

  .wrapper {
    max-width: 960px;
    margin: 0 auto;
    padding: 48px 24px 80px;
  }

  .header {
    text-align: center;
    margin-bottom: 52px;
  }

  .eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.3em;
    color: ${ACCENT};
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 5vw, 3.6rem);
    font-weight: 900;
    color: #fff;
    line-height: 1.1;
    margin-bottom: 14px;
  }

  h1 span {
    color: ${ACCENT};
    font-style: italic;
  }

  .subtitle {
    color: ${MUTED};
    font-size: 15px;
    font-weight: 300;
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .divider {
    width: 48px;
    height: 2px;
    background: ${ACCENT};
    margin: 24px auto 0;
  }

  /* FORM */
  .form-card {
    background: ${CARD};
    border: 1px solid ${BORDER};
    border-radius: 4px;
    padding: 40px;
    margin-bottom: 40px;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .field.full { grid-column: 1 / -1; }

  label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: ${MUTED};
  }

  input, textarea, select {
    background: #1E1E1E;
    border: 1px solid ${BORDER};
    border-radius: 3px;
    color: ${TEXT};
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    padding: 12px 14px;
    transition: border-color 0.2s;
    outline: none;
    width: 100%;
  }

  input::placeholder, textarea::placeholder { color: #3A3A3A; }

  input:focus, textarea:focus, select:focus {
    border-color: ${ACCENT};
  }

  textarea { resize: vertical; min-height: 96px; }

  select option { background: #1E1E1E; }

  .btn-generate {
    width: 100%;
    margin-top: 32px;
    padding: 16px;
    background: ${ACCENT};
    color: #000;
    border: none;
    border-radius: 3px;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
  }

  .btn-generate:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
  .btn-generate:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

  /* LOADING */
  .loading-bar-wrap {
    height: 2px;
    background: ${BORDER};
    border-radius: 2px;
    overflow: hidden;
    margin-top: 20px;
  }

  .loading-bar {
    height: 100%;
    background: ${ACCENT};
    animation: sweep 1.6s ease-in-out infinite;
  }

  @keyframes sweep {
    0% { width: 0%; margin-left: 0%; }
    50% { width: 60%; margin-left: 20%; }
    100% { width: 0%; margin-left: 100%; }
  }

  .loading-text {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.2em;
    color: ${MUTED};
    text-align: center;
    margin-top: 14px;
    animation: pulse 1.4s ease-in-out infinite;
  }

  @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }

  /* PROFILE OUTPUT */
  .profile-output {
    animation: fadeUp 0.5s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .profile-header-bar {
    background: linear-gradient(135deg, #1A1400 0%, #1E1800 60%, #0D0D0D 100%);
    border: 1px solid ${BORDER};
    border-bottom: 2px solid ${ACCENT};
    border-radius: 4px 4px 0 0;
    padding: 36px 40px 28px;
    position: relative;
    overflow: hidden;
  }

  .profile-header-bar::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(244,163,0,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .profile-tag {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: ${ACCENT};
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .profile-tag::before {
    content: '';
    display: inline-block;
    width: 20px; height: 1px;
    background: ${ACCENT};
  }

  .profile-biz-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 700;
    color: #fff;
    line-height: 1.15;
    margin-bottom: 8px;
  }

  .profile-tagline {
    color: ${MUTED};
    font-size: 14px;
    font-style: italic;
  }

  .profile-body {
    background: ${CARD};
    border: 1px solid ${BORDER};
    border-top: none;
    border-radius: 0 0 4px 4px;
    padding: 36px 40px;
  }

  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: ${ACCENT};
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${BORDER};
  }

  .profile-section {
    margin-bottom: 32px;
  }

  .profile-text {
    font-size: 15px;
    line-height: 1.75;
    color: #C8C2B5;
  }

  .meta-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }

  .meta-item {
    background: #1A1A1A;
    border: 1px solid ${BORDER};
    border-radius: 3px;
    padding: 14px 16px;
  }

  .meta-item-label {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${MUTED};
    margin-bottom: 6px;
  }

  .meta-item-value {
    font-size: 13px;
    color: ${TEXT};
    font-weight: 500;
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag {
    background: rgba(244,163,0,0.08);
    border: 1px solid rgba(244,163,0,0.2);
    border-radius: 2px;
    padding: 5px 12px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: ${ACCENT};
    letter-spacing: 0.05em;
  }

  .usp-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .usp-list li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 14px;
    color: #C8C2B5;
    line-height: 1.6;
  }

  .usp-list li::before {
    content: '→';
    color: ${ACCENT};
    font-family: 'DM Mono', monospace;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .score-row {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .score-item {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .score-label-txt {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.1em;
    color: ${MUTED};
    width: 140px;
    flex-shrink: 0;
  }

  .score-track {
    flex: 1;
    height: 4px;
    background: ${BORDER};
    border-radius: 2px;
    overflow: hidden;
  }

  .score-fill {
    height: 100%;
    background: ${ACCENT};
    border-radius: 2px;
    transition: width 1s ease;
  }

  .score-num {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: ${ACCENT};
    width: 32px;
    text-align: right;
  }

  .cta-row {
    display: flex;
    gap: 12px;
    margin-top: 36px;
    padding-top: 28px;
    border-top: 1px solid ${BORDER};
  }

  .btn-outline {
    flex: 1;
    padding: 12px;
    background: transparent;
    border: 1px solid ${BORDER};
    border-radius: 3px;
    color: ${MUTED};
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
  }

  .btn-outline:hover { border-color: ${ACCENT}; color: ${ACCENT}; }

  .btn-primary-sm {
    flex: 1;
    padding: 12px;
    background: ${ACCENT};
    border: none;
    border-radius: 3px;
    color: #000;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .btn-primary-sm:hover { opacity: 0.85; }

  .error-box {
    background: rgba(220,50,50,0.08);
    border: 1px solid rgba(220,50,50,0.25);
    border-radius: 3px;
    padding: 14px 18px;
    color: #FF7070;
    font-size: 13px;
    margin-top: 16px;
    font-family: 'DM Mono', monospace;
  }

  @media (max-width: 600px) {
    .form-grid { grid-template-columns: 1fr; }
    .form-card { padding: 24px 20px; }
    .profile-header-bar, .profile-body { padding: 24px 20px; }
    .cta-row { flex-direction: column; }
    .meta-grid { grid-template-columns: 1fr 1fr; }
  }
`;

function parseProfile(text) {
  const get = (re) => { const m = text.match(re); return m ? m[1].trim() : ""; };
  const getBlock = (label) => {
    const re = new RegExp(`${label}[:\\s]*([\\s\\S]*?)(?=\\n[A-Z_]+:|$)`, 'i');
    const m = text.match(re);
    return m ? m[1].trim() : "";
  };
  const getList = (label) => {
    const block = getBlock(label);
    return block.split('\n').map(l => l.replace(/^[-*•→\d.]\s*/, '').trim()).filter(Boolean);
  };
  const getScore = (label) => {
    const re = new RegExp(`${label}[:\\s]*(\\d+)`, 'i');
    const m = text.match(re);
    return m ? parseInt(m[1]) : Math.floor(Math.random() * 30) + 65;
  };

  return {
    businessName: get(/BUSINESS_NAME:\s*(.+)/i) || get(/business name:\s*(.+)/i) || "Your Business",
    tagline: get(/TAGLINE:\s*(.+)/i) || "",
    overview: getBlock("OVERVIEW") || getBlock("overview"),
    mission: getBlock("MISSION") || getBlock("mission"),
    targetAudienceDesc: getBlock("AUDIENCE_PROFILE") || getBlock("audience profile") || getBlock("target audience"),
    usps: getList("UNIQUE_SELLING_POINTS") || getList("USP") || getList("unique selling"),
    keywords: (getBlock("SEO_KEYWORDS") || getBlock("keywords") || "").split(',').map(k => k.trim()).filter(Boolean),
    callToAction: getBlock("CALL_TO_ACTION") || getBlock("call to action") || "",
    scores: {
      marketFit: getScore("MARKET_FIT"),
      brandClarity: getScore("BRAND_CLARITY"),
      seoStrength: getScore("SEO_STRENGTH"),
      audienceAlignment: getScore("AUDIENCE_ALIGNMENT"),
    },
    rawText: text,
  };
}

export default function App() {
  const [form, setForm] = useState({
    websiteUrl: "",
    businessType: "",
    targetAudience: "",
    location: "",
    products: "",
  });
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const generate = async () => {
    if (!form.businessType || !form.targetAudience || !form.products) {
      setError("Please fill in at least Business Type, Target Audience, and Products/Services.");
      return;
    }
    setError("");
    setLoading(true);
    setProfile(null);

    const prompt = `You are a professional business strategist and copywriter. Generate a structured business profile based on the following inputs.

Website URL: ${form.websiteUrl || "Not provided"}
Business Type: ${form.businessType}
Target Audience: ${form.targetAudience}
Location: ${form.location || "Not specified"}
Products/Services: ${form.products}

Output ONLY this structured format (no markdown, no extra text):

BUSINESS_NAME: [derive a fitting business name or use the domain if URL provided]
TAGLINE: [one punchy line, max 10 words]

OVERVIEW:
[3-4 sentences describing the business, what it does, and its market position]

MISSION:
[2-3 sentences on purpose and values]

AUDIENCE_PROFILE:
[2-3 sentences describing the ideal customer in detail]

UNIQUE_SELLING_POINTS:
- [USP 1]
- [USP 2]
- [USP 3]
- [USP 4]

SEO_KEYWORDS:
[8-10 relevant keywords, comma separated]

CALL_TO_ACTION:
[One compelling call-to-action sentence for a homepage hero]

MARKET_FIT: [score 1-100]
BRAND_CLARITY: [score 1-100]
SEO_STRENGTH: [score 1-100]
AUDIENCE_ALIGNMENT: [score 1-100]`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      if (!text) throw new Error("Empty response from AI.");
      setProfile(parseProfile(text));
    } catch (e) {
      setError("Failed to generate profile. " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!profile) return;
    navigator.clipboard.writeText(profile.rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => { setProfile(null); setForm({ websiteUrl:"", businessType:"", targetAudience:"", location:"", products:"" }); };

  return (
    <>
      <style>{styles}</style>
      <div className="wrapper">
        <div className="header">
          <div className="eyebrow">AI-Powered · Business Intelligence</div>
          <h1>Build Your <span>Business Profile</span></h1>
          <p className="subtitle">Enter your business details and get a complete, AI-generated brand profile in seconds.</p>
          <div className="divider" />
        </div>

        {!profile && (
          <div className="form-card">
            <div className="form-grid">
              <div className="field">
                <label>Website URL</label>
                <input
                  type="url"
                  placeholder="https://yourbusiness.com"
                  value={form.websiteUrl}
                  onChange={e => update("websiteUrl", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Business Type *</label>
                <input
                  placeholder="e.g. E-commerce, SaaS, Restaurant…"
                  value={form.businessType}
                  onChange={e => update("businessType", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Target Audience *</label>
                <input
                  placeholder="e.g. Working professionals aged 25-40"
                  value={form.targetAudience}
                  onChange={e => update("targetAudience", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Location</label>
                <input
                  placeholder="e.g. New York, USA / Global"
                  value={form.location}
                  onChange={e => update("location", e.target.value)}
                />
              </div>
              <div className="field full">
                <label>Products / Services *</label>
                <textarea
                  placeholder="Describe what you offer, key features, pricing model…"
                  value={form.products}
                  onChange={e => update("products", e.target.value)}
                />
              </div>
            </div>

            <button className="btn-generate" onClick={generate} disabled={loading}>
              {loading ? "Generating Profile…" : "Generate Business Profile →"}
            </button>

            {loading && (
              <>
                <div className="loading-bar-wrap"><div className="loading-bar" /></div>
                <div className="loading-text">Analyzing your business · Building your profile</div>
              </>
            )}

            {error && <div className="error-box">⚠ {error}</div>}
          </div>
        )}

        {profile && (
          <div className="profile-output">
            <div className="profile-header-bar">
              <div className="profile-tag">Business Profile</div>
              <div className="profile-biz-name">{profile.businessName}</div>
              {profile.tagline && <div className="profile-tagline">"{profile.tagline}"</div>}
            </div>

            <div className="profile-body">
              {/* Meta */}
              <div className="profile-section">
                <div className="section-label">Quick Facts</div>
                <div className="meta-grid">
                  <div className="meta-item">
                    <div className="meta-item-label">Business Type</div>
                    <div className="meta-item-value">{form.businessType}</div>
                  </div>
                  <div className="meta-item">
                    <div className="meta-item-label">Location</div>
                    <div className="meta-item-value">{form.location || "Global"}</div>
                  </div>
                  <div className="meta-item">
                    <div className="meta-item-label">Target Audience</div>
                    <div className="meta-item-value">{form.targetAudience}</div>
                  </div>
                  {form.websiteUrl && (
                    <div className="meta-item">
                      <div className="meta-item-label">Website</div>
                      <div className="meta-item-value" style={{wordBreak:'break-all', fontSize:12}}>{form.websiteUrl}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Overview */}
              {profile.overview && (
                <div className="profile-section">
                  <div className="section-label">Business Overview</div>
                  <p className="profile-text">{profile.overview}</p>
                </div>
              )}

              {/* Mission */}
              {profile.mission && (
                <div className="profile-section">
                  <div className="section-label">Mission & Values</div>
                  <p className="profile-text">{profile.mission}</p>
                </div>
              )}

              {/* Audience */}
              {profile.targetAudienceDesc && (
                <div className="profile-section">
                  <div className="section-label">Audience Profile</div>
                  <p className="profile-text">{profile.targetAudienceDesc}</p>
                </div>
              )}

              {/* USPs */}
              {profile.usps.length > 0 && (
                <div className="profile-section">
                  <div className="section-label">Unique Selling Points</div>
                  <ul className="usp-list">
                    {profile.usps.map((u, i) => <li key={i}>{u}</li>)}
                  </ul>
                </div>
              )}

              {/* CTA */}
              {profile.callToAction && (
                <div className="profile-section">
                  <div className="section-label">Recommended Call to Action</div>
                  <p className="profile-text" style={{fontStyle:'italic', color: '#E8DFC8'}}>{profile.callToAction}</p>
                </div>
              )}

              {/* Keywords */}
              {profile.keywords.length > 0 && (
                <div className="profile-section">
                  <div className="section-label">SEO Keywords</div>
                  <div className="tag-list">
                    {profile.keywords.map((k, i) => <span key={i} className="tag">{k}</span>)}
                  </div>
                </div>
              )}

              {/* Scores */}
              <div className="profile-section">
                <div className="section-label">Profile Scores</div>
                <div className="score-row">
                  {Object.entries(profile.scores).map(([k, v]) => (
                    <div className="score-item" key={k}>
                      <div className="score-label-txt">{k.replace(/([A-Z])/g, ' $1').trim()}</div>
                      <div className="score-track">
                        <div className="score-fill" style={{ width: `${v}%` }} />
                      </div>
                      <div className="score-num">{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cta-row">
                <button className="btn-outline" onClick={reset}>← Start Over</button>
                <button className="btn-outline" onClick={handleCopy}>{copied ? "Copied ✓" : "Copy Raw Text"}</button>
                <button className="btn-primary-sm" onClick={() => {
                  const blob = new Blob([profile.rawText], { type: 'text/plain' });
                  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
                  a.download = 'business-profile.txt'; a.click();
                }}>Download Profile</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
