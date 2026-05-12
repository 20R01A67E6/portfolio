# Abhinav Reddy Kandula — Portfolio

🔗 **Live:** [abhinav-reddy-kandula.vercel.app](https://abhinav-reddy-kandula.vercel.app)

A personal portfolio built from scratch with Next.js, React, and Firebase. Features real-time visitor tracking, automated email notifications, dynamic certifications from Google Drive, and a premium dark-themed design with interactive animations.

---

## Tech Stack

**Frontend:** React 18, Next.js 14, Tailwind CSS

**Backend:** Vercel Serverless Functions

**Database:** Firebase Firestore

**Email:** SendGrid API

**Certificates:** Google Drive API

**Deployment:** Vercel + GitHub

---

## Features

- Premium dark + gold themed design with custom cursor and glow effects
- Typing animation cycling through roles
- Scroll-triggered section reveals with animated skill bars
- Fully responsive — mobile, tablet, and desktop
- Hamburger menu for mobile navigation
- Contact form with email notifications via SendGrid
- Real-time visitor tracking stored in Firebase Firestore
- Automated daily visitor summary emails via Vercel Cron Jobs
- Dynamic certifications fetched from Google Drive
- Resume download with custom filename
- Open Graph image for rich link previews on LinkedIn, WhatsApp, and Twitter
- SEO optimized with sitemap.xml and robots.txt
- Custom branded 404 page

---

## Project Structure

```
portfolio/
├── app/
│   ├── page.jsx              # Main portfolio component
│   ├── layout.jsx            # Root layout with SEO metadata
│   ├── globals.css            # Tailwind + custom animations
│   ├── not-found.jsx          # Custom 404 page
│   ├── sitemap.js             # Auto-generated sitemap
│   ├── robots.js              # Search engine crawl rules
│   └── favicon.ico            # Site favicon
├── api/
│   ├── submitForm.js          # Contact form handler + SendGrid
│   ├── trackVisit.js          # Visitor tracking to Firestore
│   ├── getCertificates.js     # Google Drive certificate fetcher
│   └── sendDailyVisitorSummary.js  # Daily email cron job
├── public/
│   ├── Abhinav-Reddy-Resume.pdf
│   ├── og-image.png
│   ├── favicon.ico
│   └── favicon.png
├── tailwind.config.js
├── vercel.json
└── package.json
```

---

## Getting Started

1. Clone the repo
   ```bash
   git clone https://github.com/20R01A67E6/portfolio.git
   cd portfolio
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create `.env.local` with your credentials
   ```
   FIREBASE_API_KEY=your_key
   FIREBASE_PROJECT_ID=your_project_id
   SENDGRID_API_KEY=your_sendgrid_key
   SENDGRID_FROM_EMAIL=your_email
   GOOGLE_DRIVE_FOLDER_ID=your_folder_id
   GOOGLE_SERVICE_ACCOUNT_JSON=your_service_account_json
   CRON_SECRET=your_secret
   ```

4. Run locally
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

---

## Deployment

Deployed on [Vercel](https://vercel.com) with automatic deployments on push to `main` branch. Environment variables are configured in the Vercel dashboard.

---

## Contact

**Abhinav Reddy Kandula**

- Portfolio: [abhinav-reddy-kandula.vercel.app](https://abhinav-reddy-kandula.vercel.app)
- LinkedIn: [linkedin.com/in/kandula-abhinav-reddy](https://www.linkedin.com/in/kandula-abhinav-reddy)
- GitHub: [github.com/20R01A67E6](https://github.com/20R01A67E6)
- Email: abhinavjsearch@gmail.com
