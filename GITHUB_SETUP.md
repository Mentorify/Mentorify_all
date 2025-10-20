# GitHub Repository Setup Guide

This guide will help you upload the Mentorify project to GitHub as a professional client deliverable.

## 🎯 Quick GitHub Upload Steps

### Method 1: Using GitHub CLI (Recommended)

```bash
# Install GitHub CLI if not already installed
# Mac: brew install gh
# Windows: scoop install gh
# Linux: See https://cli.github.com/manual/installation

# Navigate to project directory
cd Mentorify_Merged_and_coupon

# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: Mentorify v1.0.0 - Career Guidance Platform"

# Login to GitHub
gh auth login

# Create repository and push
gh repo create mentorify --private --source=. --remote=origin --push

# Or for public repository
gh repo create mentorify --public --source=. --remote=origin --push
```

### Method 2: Using Git + GitHub Web Interface

#### Step 1: Initialize Local Repository

```bash
# Navigate to project directory
cd Mentorify_Merged_and_coupon

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Mentorify v1.0.0 - Career Guidance Platform"
```

#### Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the **+** icon in top right
3. Select **New repository**
4. Configure repository:
   - **Repository name**: `mentorify` (or your preferred name)
   - **Description**: "Career guidance and mentorship platform built with MERN stack"
   - **Visibility**: Choose Private or Public
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **Create repository**

#### Step 3: Push to GitHub

```bash
# Add GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/mentorify.git

# Push code to GitHub
git push -u origin main

# If your default branch is 'master' instead of 'main':
git branch -M main
git push -u origin main
```

## 📝 Pre-Upload Checklist

Before uploading to GitHub, verify:

- [x] `.gitignore` files are in place
- [x] No `.env` files in repository
- [x] No `node_modules` directories will be uploaded
- [x] No sensitive information in code
- [x] All documentation files are present
- [x] `env.example` files are included
- [x] Build folder considerations

## 🔍 Verify What Will Be Uploaded

Check what files will be committed:

```bash
# See staged files
git status

# See all files that will be tracked
git ls-files

# Check if .env files are ignored
git check-ignore .env unified-server/.env unified-client/.env
# Should output the file paths (meaning they ARE ignored - good!)

# Check if node_modules are ignored
git check-ignore unified-server/node_modules unified-client/node_modules
# Should output the paths (meaning they ARE ignored - good!)
```

## 🛡️ Security Verification

Double-check no sensitive data:

```bash
# Search for potential secrets in staged files
git grep -i "password.*=" 
git grep -i "secret.*="
git grep -i "api.*key"

# Check .env files are not tracked
git ls-files | grep ".env$"
# Should return nothing

# Verify .gitignore is working
git status --ignored
```

## 📦 Repository Configuration

### Set Repository Description

On GitHub repository page:
1. Click **About** ⚙️ (gear icon)
2. Add description: "Career guidance and mentorship platform built with MERN stack (MongoDB, Express, React, Node.js)"
3. Add topics: `react`, `nodejs`, `mongodb`, `express`, `career-guidance`, `mentorship`, `mern-stack`
4. Add website URL (if deployed)

### Configure Repository Settings

1. **Branch Protection** (recommended for production):
   - Go to Settings → Branches
   - Add rule for `main` branch
   - Enable "Require pull request reviews before merging"

2. **Security**:
   - Go to Settings → Security & analysis
   - Enable "Dependency alerts"
   - Enable "Dependabot security updates"

3. **GitHub Pages** (optional):
   - Can be used for documentation
   - Go to Settings → Pages

## 📄 Add Repository Metadata

### Create Repository Topics

Add these topics to your repository for better discoverability:
- `react`
- `nodejs`
- `mongodb`
- `express`
- `mern-stack`
- `career-guidance`
- `mentorship`
- `psychometric-tests`
- `dashboard`
- `jwt-authentication`

### Update Repository About Section

**Short description**:
```
Career guidance and mentorship platform with psychometric tests, multi-role dashboards, and comprehensive reporting.
```

## 🌿 Branch Strategy (Optional)

For team development:

```bash
# Create development branch
git checkout -b develop

# Create feature branches from develop
git checkout -b feature/new-feature

# Merge back to develop when done
git checkout develop
git merge feature/new-feature

# Merge develop to main for releases
git checkout main
git merge develop
```

## 🏷️ Create Release Tag

```bash
# Create a tag for version 1.0.0
git tag -a v1.0.0 -m "Mentorify v1.0.0 - Initial Release"

# Push tag to GitHub
git push origin v1.0.0

# Or push all tags
git push --tags
```

### Create GitHub Release

1. Go to repository → Releases
2. Click "Create a new release"
3. Choose tag `v1.0.0`
4. Release title: "Mentorify v1.0.0 - Initial Release"
5. Description: Copy from CHANGELOG.md
6. Attach any additional files if needed
7. Click "Publish release"

## 📋 Post-Upload Checklist

After uploading to GitHub:

- [ ] Repository is visible and accessible
- [ ] README.md displays correctly
- [ ] All documentation files are present
- [ ] No .env files visible in repository
- [ ] No node_modules visible in repository
- [ ] Links in README work correctly
- [ ] License file is recognized by GitHub
- [ ] Repository description is set
- [ ] Topics are added
- [ ] Initial release is created (optional)

## 🔗 Update Documentation Links

After creating the repository, update these in README.md:

```markdown
# Replace <repository-url> with actual URL
git clone https://github.com/YOUR_USERNAME/mentorify.git

# Update badge URLs (optional)
![GitHub](https://img.shields.io/github/license/YOUR_USERNAME/mentorify)
![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/mentorify)
```

## 🎨 Add README Badges (Optional)

Add badges to the top of README.md for professionalism:

```markdown
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
![MongoDB](https://img.shields.io/badge/mongodb-%3E%3D4.0-green.svg)
```

## 🤝 Collaborator Access

To add collaborators:

1. Go to Settings → Collaborators
2. Click "Add people"
3. Enter GitHub username or email
4. Select permission level:
   - **Read**: View only
   - **Write**: Push access
   - **Admin**: Full control

## 🔄 Keeping Repository Updated

### For Future Updates

```bash
# Stage changes
git add .

# Commit changes
git commit -m "feat: Add new feature description"

# Push to GitHub
git push origin main
```

### Commit Message Convention

Follow conventional commits:

```bash
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

## 🌐 Make Repository Public (If Private Initially)

To change from private to public:

1. Go to Settings → Danger Zone
2. Click "Change visibility"
3. Select "Make public"
4. Confirm by typing repository name

⚠️ **Warning**: Once public, all history becomes visible!

## 📊 Repository Insights

Enable useful insights:

1. **Insights tab** → Enable community standards
2. Add CODE_OF_CONDUCT.md (optional)
3. Add CONTRIBUTING.md ✅ (already included)
4. Add LICENSE ✅ (already included)
5. Add SECURITY.md ✅ (already included)

## 🎯 Repository Template (Optional)

To use this as a template for future projects:

1. Go to Settings
2. Check "Template repository"
3. Others can now use "Use this template" button

## 📱 GitHub Mobile

Monitor repository on the go:
- Download GitHub Mobile app
- Receive notifications for issues, PRs
- Review and merge pull requests

## 🔐 Security Best Practices

### Enable Security Features

1. **Dependabot Alerts**: Auto-enabled for public repos
2. **Code Scanning**: Available for public repos
3. **Secret Scanning**: Automatic for public repos

### Review Committed History

```bash
# Check commit history for accidentally committed secrets
git log --all --full-history --source -- .env
# Should return nothing

# Use BFG or git-filter-repo to clean if needed
```

## 📞 Support

### Add Support Channels

In repository Settings:
1. Add support email
2. Link to documentation
3. Add discussion forum link (if using GitHub Discussions)

## ✅ Final Verification

Before sharing the repository:

```bash
# Clone in a new directory to test
cd /tmp
git clone https://github.com/YOUR_USERNAME/mentorify.git
cd mentorify

# Verify structure
ls -la

# Check .gitignore is working
ls unified-server/.env  # Should not exist
ls unified-client/.env  # Should not exist

# Verify documentation
cat README.md
cat SETUP.md
```

## 🎊 Repository Ready!

Your repository is now professionally set up and ready to share with clients!

**Repository URL**: `https://github.com/YOUR_USERNAME/mentorify`

### Share With Client

Provide client with:
1. Repository URL
2. Brief overview from README
3. Link to SETUP.md for getting started
4. Link to DEPLOYMENT.md for production setup

---

## 🆘 Troubleshooting

### Issue: "Large files" error

```bash
# Remove file from git cache
git rm --cached path/to/large/file

# Add to .gitignore
echo "path/to/large/file" >> .gitignore

# Commit and push
git commit -m "Remove large file"
git push origin main
```

### Issue: Accidentally committed .env

```bash
# Remove from git
git rm --cached .env
git rm --cached unified-server/.env
git rm --cached unified-client/.env

# Ensure .gitignore includes .env
echo ".env" >> .gitignore

# Commit
git commit -m "Remove .env files from git"
git push origin main

# Rotate all secrets that were in the .env file!
```

### Issue: Wrong files in repository

```bash
# Check .gitignore
cat .gitignore

# Remove unwanted files
git rm -r --cached unwanted-folder

# Commit
git commit -m "Remove unwanted files"
git push origin main
```

---

**Good luck with your GitHub repository!** 🚀

For any issues, refer to [GitHub Documentation](https://docs.github.com/).
