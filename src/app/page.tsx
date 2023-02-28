"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [posts , setPosts] = useState([]);

  useEffect(() => {
    
  }, []);

  return (
    <main className='py-12'>
      <h1 className="text-3xl font-bold underline">
        Welcome home
      </h1>
      <Link href="/dashboard">Navigate to Dashboard</Link>
    </main>
  )
}
