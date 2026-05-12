export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://abhinav-reddy-kandula.vercel.app/sitemap.xml',
  }
}
