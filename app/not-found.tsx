import Link from 'next/link'

export default function NotFound() {
  return <div className="text-center italic ">
      <h1 className='minion-font mt-20'>404: Navigation out of sync . . .</h1>
      <div className='mt-10'>
        <Link href="/" className="minion-font text-purple">Reset Initial Cue Point</Link>
      </div>
  </div>
}