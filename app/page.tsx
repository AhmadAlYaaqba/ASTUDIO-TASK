import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-4xl font-bold mb-8 text-primary-black">ASTUDIO Practical Assessment - Ahmad Alyaaqba</h1>
      <div className="flex gap-6">
        <Link
          href="/users"
          className="px-6 py-3 bg-primary-blue text-primary-black font-bold rounded-md hover:bg-primary-yellow transition-colors"
        >
          Users Page
        </Link>
        <Link
          href="/products"
          className="px-6 py-3 bg-primary-blue text-primary-black font-bold rounded-md hover:bg-primary-yellow transition-colors"
        >
          Products Page
        </Link>
      </div>
    </div>
  )
}

