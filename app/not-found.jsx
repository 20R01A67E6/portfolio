import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#08080d] flex flex-col items-center justify-center px-6 text-center">

      {/* Large 404 */}
      <h1 className="font-serif text-[8rem] md:text-[12rem] font-bold leading-none mb-2"
        style={{
          background: 'linear-gradient(135deg, #e8e6e3 0%, #d4af37 40%, #f4d03f 60%, #e8e6e3 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
        404
      </h1>

      {/* Gold line */}
      <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-8" />

      {/* Message */}
      <h2 className="font-serif text-2xl md:text-3xl font-medium text-gray-100 mb-4">
        Page not found
      </h2>
      <p className="text-gray-500 text-lg mb-10 max-w-md font-light leading-relaxed">
        Looks like you've wandered off the map. The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Back button */}
      <Link href="/"
        className="px-10 py-4 bg-gradient-to-br from-[#d4af37] to-[#b8941e] text-[#08080d] rounded-sm text-sm font-semibold tracking-widest uppercase no-underline font-sans transition-all duration-300 hover:shadow-lg hover:shadow-[#d4af37]/30 hover:-translate-y-0.5">
        ← Back to Portfolio
      </Link>

      {/* Decorative dots */}
      <div className="absolute top-[20%] left-[15%] w-1.5 h-1.5 rounded-full bg-[#d4af37]/30" style={{ animation: 'float 6s ease-in-out infinite' }} />
      <div className="absolute bottom-[30%] right-[10%] w-2 h-2 rounded-full border border-[#d4af37]/20" style={{ animation: 'float 6s ease-in-out infinite 2s' }} />
      <div className="absolute top-[40%] right-[20%] w-1 h-1 rounded-full bg-[#d4af37]/20" style={{ animation: 'float 6s ease-in-out infinite 4s' }} />
    </div>
  )
}
