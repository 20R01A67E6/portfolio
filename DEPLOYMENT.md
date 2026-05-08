# 🚀 Quick Deployment Guide

## Step 1: Prepare Local Machine

```bash
# 1. Copy all files from this portfolio folder to your local machine
# 2. Open Terminal/Command Prompt
# 3. Navigate to the portfolio folder
cd portfolio

# 4. Initialize git
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

## Step 2: Create .env.local

```bash
# 1. Copy the template
cp .env.local.template .env.local

# 2. Open .env.local in a text editor
# 3. Replace ALL placeholder values with your credentials:
#    - FIREBASE_API_KEY (from Firebase)
#    - FIREBASE_AUTH_DOMAIN (from Firebase)
#    - FIREBASE_PROJECT_ID (from Firebase)
#    - FIREBASE_STORAGE_BUCKET (from Firebase)
#    - FIREBASE_MESSAGING_SENDER_ID (from Firebase)
#    - FIREBASE_APP_ID (from Firebase)
#    - SENDGRID_API_KEY (from SendGrid)
#    - SENDGRID_FROM_EMAIL (your email)
#    - GOOGLE_DRIVE_FOLDER_ID (1UYLtw4394ExzSC7tY1dEP3Ls2eaXNMU-)
#    - GOOGLE_SERVICE_ACCOUNT_JSON (entire JSON from Google Cloud)
#    - CRON_SECRET (any random string like abc123xyz789)

# 4. Save the file
```

## Step 3: Push to GitHub

```bash
# 1. Create new repo on github.com named 'portfolio'

# 2. In Terminal/Command Prompt:
git add .
git commit -m "Initial portfolio setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main

# 3. Check GitHub - you should see all files uploaded
```

## Step 4: Deploy to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your 'portfolio' repository
4. **IMPORTANT:** Add environment variables:
   - Click "Environment Variables"
   - Add each variable from your .env.local:
     - FIREBASE_API_KEY
     - FIREBASE_AUTH_DOMAIN
     - FIREBASE_PROJECT_ID
     - FIREBASE_STORAGE_BUCKET
     - FIREBASE_MESSAGING_SENDER_ID
     - FIREBASE_APP_ID
     - SENDGRID_API_KEY
     - SENDGRID_FROM_EMAIL
     - GOOGLE_DRIVE_FOLDER_ID
     - GOOGLE_SERVICE_ACCOUNT_JSON
     - CRON_SECRET
5. Click "Deploy"
6. Wait 2-3 minutes
7. You'll get your live URL!

## Step 5: Test Everything

1. **Visit your portfolio URL** - Should see your profile
2. **Fill contact form** - Check email for confirmation
3. **Refresh page 3-4 times** - Tests visitor tracking
4. **Check Firebase** - Visit logs should appear in Firestore

## Troubleshooting

### Build Failed?
- Check that all environment variables are set in Vercel
- Check that .env.local exists locally and is formatted correctly
- Check Vercel deployment logs

### Form not working?
- Verify SENDGRID_API_KEY is correct
- Verify SENDGRID_FROM_EMAIL is verified in SendGrid
- Check browser console for errors

### Certificates not showing?
- Verify GOOGLE_DRIVE_FOLDER_ID is correct
- Check Google Drive folder is shared with service account email
- Check GOOGLE_SERVICE_ACCOUNT_JSON is valid JSON

### Visitor tracking not working?
- Verify Firebase credentials are correct
- Check Firebase Firestore exists and is accessible
- Verify Firestore security rules are published

## Next Steps

- Add custom domain in Vercel settings
- Customize content in app/page.jsx
- Monitor visitor analytics in Firebase
- Check daily summary emails

## Support

Check README.md for more details and documentation links.

---

**Your portfolio is live! 🎉**
