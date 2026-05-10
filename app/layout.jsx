import './globals.css'

export const metadata = {
  title: 'Abhinav Reddy Kandula - Portfolio',
  description: 'Software Engineer | AI/ML Specialist | Computer Vision Engineer',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Abhinav Reddy Kandula',
    description: 'Personal portfolio and projects',
    url: 'https://abhinav-portfolio.vercel.app',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
