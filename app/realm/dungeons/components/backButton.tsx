import Link from "next/link"

const BackButton = () => {
  return (
    <Link
        href="/realm/dungeons"
        className="absolute top-6 left-6 z-20 px-4 py-2 bg-black/50 text-white rounded-md border border-white/20 hover:bg-black/70 transition-colors duration-200 backdrop-blur-sm text-lg"
      >
        ← Back
    </Link>
  )
}

export default BackButton