# Abhinav's Portfolio

A full-stack portfolio website built with React, Next.js, Firebase, and Vercel.

## Features

- ✅ Modern dark theme with gradient UI
- ✅ Dynamic certificates from Google Drive
- ✅ Contact form with email notifications
- ✅ Visitor tracking & analytics
- ✅ Daily visitor summary emails
- ✅ Fully responsive design

## Tech Stack

- **Frontend:** React 18 + Next.js 14 + Tailwind CSS
- **Backend:** Vercel Serverless Functions
- **Database:** Firebase Firestore
- **Email:** SendGrid API
- **Storage:** Google Drive API
- **Deployment:** Vercel

## Setup Instructions

### 1. Prerequisites

- Node.js 18+
- GitHub account
- Firebase account (free)
- SendGrid account (free)
- Google Cloud account (free)

### 2. Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

### 3. Environment Variables

Create `.env.local` from `.env.local.template` and fill in your credentials:

```bash
cp .env.local.template .env.local
# Edit .env.local with your credentials
```

### 4. Deploy to Vercel

1. Push to GitHub
2. Go to vercel.com/new
3. Import your portfolio repo
4. Add environment variables
5. Deploy

## Project Structure

```
portfolio/
├── app/
│   ├── page.jsx           # Main portfolio component
│   ├── layout.jsx         # Root layout
│   └── globals.css        # Global styles
├── api/
│   ├── getCertificates.js # Google Drive integration
│   ├── submitForm.js      # Form & email handler
│   ├── trackVisit.js      # Visit tracking
│   └── sendDailyVisitorSummary.js # Daily emails (Cron)
├── .env.local.template    # Environment variables template
├── vercel.json            # Vercel config + Cron
├── package.json           # Dependencies
└── README.md              # This file
```

## API Endpoints

- `GET /api/getCertificates` - Fetch certificates from Google Drive
- `POST /api/submitForm` - Handle contact form submissions
- `GET /api/trackVisit` - Track page visits (auto-called)
- `POST /api/sendDailyVisitorSummary` - Send daily summary (Cron job)

## Credentials Setup

### Firebase
1. Create project at firebase.google.com
2. Create web app
3. Create Firestore database
4. Create service account JSON
5. Publish security rules

### SendGrid
1. Create free account at sendgrid.com
2. Generate API key
3. Verify sender email

### Google Cloud
1. Create project at console.cloud.google.com
2. Enable Google Drive API
3. Create service account
4. Share certificates folder with service account

## Security

- Never commit `.env.local` to GitHub
- Keep API keys confidential
- Use `.env.local.template` for sharing
- Firebase security rules prevent unauthorized access

## Customization

### Change Content

Edit `app/page.jsx` to update:
- About section
- Experience details
- Project list
- Skills
- Education

### Change Colors

Look for Tailwind color classes like:
- `from-blue-400` - Primary color
- `from-purple-500` - Secondary color
- `slate-900` - Background

### Change Email Recipient

In API files, update:
```javascript
to: 'your_email@example.com'
```

## Monitoring

- **Form Submissions:** Firebase Firestore `formSubmissions` collection
- **Visitor Analytics:** Firebase Firestore `visits` collection
- **Email Delivery:** SendGrid dashboard
- **Deployment:** Vercel dashboard

## Support

- **Vercel:** https://vercel.com/docs
- **Next.js:** https://nextjs.org/docs
- **Firebase:** https://firebase.google.com/docs
- **SendGrid:** https://docs.sendgrid.com

## License

MIT License - Feel free to customize!

---

**Built with ❤️ by Abhinav**
