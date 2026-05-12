import './globals.css'

export const metadata = {
  title: 'Abhinav Reddy Kandula — Software Developer & AI/ML Engineer',
  description: 'Software Developer and AI/ML Engineer specializing in computer vision, deep learning, and full-stack development. Currently building intelligent systems at Analysis Express.',
  keywords: ['Abhinav Reddy Kandula', 'Software Developer', 'AI Engineer', 'ML Engineer', 'Computer Vision', 'YOLO', 'Python', 'React', 'Next.js', 'Full Stack Developer', 'Cincinnati'],
  authors: [{ name: 'Abhinav Reddy Kandula' }],
  creator: 'Abhinav Reddy Kandula',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Abhinav Reddy Kandula — Software Developer & AI/ML Engineer',
    description: 'Explore my work in computer vision, deep learning, and full-stack development. Featuring real projects, experience, and certifications.',
    url: 'https://abhinav-reddy-kandula.vercel.app',
    siteName: 'Abhinav Reddy Kandula Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 627,
        alt: 'Abhinav Reddy Kandula — Software Developer & AI/ML Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhinav Reddy Kandula — Software Developer & AI/ML Engineer',
    description: 'Software Developer and AI/ML Engineer specializing in computer vision, deep learning, and full-stack development.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
