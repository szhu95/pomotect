import Link from 'next/link'

export default function NotFound() {
  return <div className="text-center">
      <h1>404 error or something like that</h1>
      <div className='mt-10'>
        <Link href="/" className="italic text-purple">Back to Home</Link>
      </div>
  </div>
}