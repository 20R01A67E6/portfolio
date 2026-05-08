import './globals.css'

export const metadata = {
  title: 'Abhinav Reddy Kandula - Portfolio',
  description: 'Software Engineer | AI/ML Specialist | Computer Vision Engineer',
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
      <body>{children}</body>
    </html>
  )
}
