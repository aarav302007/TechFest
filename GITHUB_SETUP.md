# GitHub Setup & Version Control

## Initial Repository Setup

### 1. Create GitHub Repository

```bash
# Go to github.com and create new repository
# Name: zero-touch-growth-os
# Description: Autonomous digital growth platform for NMIMS INNOVATHON 2026
# Private or Public: Public (for hackathon showcase)
# DO NOT initialize with README (we have one)
```

### 2. Initialize Git in Project

```bash
# Initialize git
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Zero-Touch Growth OS v1.0

- Complete MVP with all 7 features
- Business onboarding
- Weekly content calendar
- Caption generator
- Festival detector
- Ad recommendations
- Performance dashboard
- Full documentation"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/zero-touch-growth-os.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Commit History Best Practices

### Recommended Commit Timeline

```bash
# Commit 1: Project setup
git commit -m "chore: Initial Next.js setup with TypeScript and Tailwind"

# Commit 2: Core utilities
git commit -m "feat: Add Gemini API integration and fallback system"

# Commit 3: Pages
git commit -m "feat: Add business onboarding and profile generation"
git commit -m "feat: Add weekly calendar generation"
git commit -m "feat: Add caption generator"
git commit -m "feat: Add festival detector"

# Commit 4: API routes
git commit -m "feat: Add API routes for AI features"

# Commit 5: Dashboard
git commit -m "feat: Add performance dashboard with charts"

# Commit 6: Documentation
git commit -m "docs: Add comprehensive README and guides"

# Commit 7: Final push
git commit -m "docs: Add submission materials"
```

---

## Important: Don't Commit These

```bash
# Files that should NOT be in Git:

.env.local              # Contains API keys!
node_modules/           # Install via npm install
.next/                  # Build output
out/                    # Build output
.vercel/               # Vercel config

# These are in .gitignore automatically
```

---

## Daily Workflow

```bash
# Pull latest
git pull origin main

# Make changes to files

# Check status
git status

# Stage changes
git add .

# Commit with meaningful message
git commit -m "feat: Add [feature name]

Description of what changed and why."

# Push to GitHub
git push origin main
```

---

## Code Review Checklist Before Commit

- [ ] No API keys in code (check .env.example only)
- [ ] TypeScript compiles: `npm run build`
- [ ] Lints pass: `npm run lint` (if added)
- [ ] Tests pass: `npm test` (if added)
- [ ] Works locally: `npm run dev`
- [ ] Meaningful commit message
- [ ] One feature per commit (if possible)

---

## Collaborative Development

If working as a team:

```bash
# Create feature branch
git checkout -b feature/calendar-generation

# Make changes and commit
git commit -m "feat: Implement weekly calendar with festival awareness"

# Push feature branch
git push origin feature/calendar-generation

# Create Pull Request on GitHub
# After review → Merge to main
```

---

## .gitignore Explanation

```
# Files explicitly excluded from Git:

node_modules/              # ~500MB of npm packages
.env.local                 # API keys for local dev
.next/                     # Next.js build artifacts
.vercel/                   # Vercel deployment config
build/                     # Build output
dist/                      # Distribution files

# IDE files (optional, but recommended)
.vscode/                   # VS Code settings
.idea/                     # IntelliJ settings

# OS files (optional)
.DS_Store                  # macOS
Thumbs.db                  # Windows

# Node logs
npm-debug.log*
yarn-debug.log*
```

---

## Useful Git Commands

```bash
# View commit history
git log --oneline

# See changes since last commit
git diff

# Undo last commit (keep changes)
git reset --soft HEAD~1

# See which files changed
git status

# View file history
git log --oneline -- filename

# Revert to previous commit
git revert COMMIT_HASH

# Create and push branch
git checkout -b feature-name
git push origin feature-name
```

---

## Before Hackathon Submission

```bash
# Final checks:

# 1. Ensure clean history
git log --oneline                    # Should show 5-10+ meaningful commits

# 2. Make sure nothing is uncommitted
git status                           # Should say "working tree clean"

# 3. Verify no secrets
grep -r "GEMINI_" .                 # Should only show .env.example
grep -r "FIREBASE_" .               # Should only show .env.example

# 4. Confirm .env.local is ignored
cat .gitignore | grep ".env.local"  # Should return the line

# 5. Test fresh clone
mkdir test-clone
cd test-clone
git clone <your-repo>
cd zero-touch-growth-os
npm install
npm run dev
# Should work without adding .env.local!
```

---

## Example Commit Messages

✅ **Good Commit Messages**:
```
feat: Add business profile generation with Gemini API

- Implement POST /api/business-profile endpoint
- Add fallback data for rate limiting
- Cache responses for 1 hour
- Add TypeScript types for business profile

feat: Create weekly calendar page

- 7-day calendar with festival awareness
- Responsive grid layout
- Card component for each day
- Navigation to other features

docs: Add comprehensive README with setup instructions

- Setup guide with API key configuration
- Feature explanation
- Deployment instructions
- Troubleshooting section
```

❌ **Bad Commit Messages**:
```
update              # Too vague
asdf                # Meaningless
fixed stuff         # Not specific
WIP                 # Work in progress (finish before committing)
bug fix             # Which bug?
```

---

## Push to Vercel After Each Major Feature

```bash
# After completing a major feature:

git add .
git commit -m "feat: Add [feature] with documentation"
git push origin main

# Vercel automatically deploys when you push to main
# Watch deployment at: vercel.com/dashboard
```

---

## Rollback a Deployment

If something breaks after deployment:

```bash
# Revert last commit locally
git revert HEAD~1

# Push to main (triggers new deployment)
git push origin main

# Vercel rolls back automatically
```

---

## Team Collaboration Workflow

If multiple team members:

```bash
# Each member on their own branch:
git checkout -b feature/[name]/[task]

# Example branches:
git checkout -b feature/rahul/calendar
git checkout -b feature/priya/captions
git checkout -b feature/arun/dashboard

# Work independently, then merge:
git push origin feature/rahul/calendar
# → Create Pull Request on GitHub
# → Team reviews
# → Merge when approved
```

---

## GitHub Repository Settings (Recommended)

After creating repository:

1. **Settings → General**
   - ✅ Make repository public (for hackathon showcase)
   - ✅ Description: "Autonomous growth platform for NMIMS INNOVATHON 2026"

2. **Settings → Branches**
   - Set `main` as default branch
   - Optional: Require pull request reviews

3. **Settings → Deploy Keys**
   - Add Vercel's deploy key (auto-generated)

4. **README**
   - GitHub automatically shows README.md on homepage
   - Our comprehensive README will display as project overview

---

## Sharing with Judges

When submitting to hackathon:

```
**GitHub Repository**
https://github.com/YOUR_USERNAME/zero-touch-growth-os

**Live Demo (Vercel)**
https://zero-touch-growth-os.vercel.app

**What Judges Will See**:
1. README.md (project overview)
2. Code quality (clean, organized)
3. Commit history (thoughtful, incremental)
4. Live working demo (all features)
5. Documentation (setup & architecture)
```

---

## Final Verification

Before submitting:

```bash
# Run this checklist:

echo "✓ Checking git status..."
git status                          # Should be clean

echo "✓ Checking recent commits..."
git log --oneline -5                # 5+ meaningful commits

echo "✓ Checking for secrets..."
git log -p | grep -i "api_key"      # Should return nothing

echo "✓ Checking documentation..."
ls -la *.md                         # README, QUICKSTART, ARCHITECTURE, etc.

echo "✓ Checking project structure..."
ls -la app/ components/ lib/        # All directories present

echo "✓ All checks passed! ✅"
```

Ready to submit! 🚀
