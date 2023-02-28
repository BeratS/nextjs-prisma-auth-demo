import Link from "next/link";

export default async function Dashboard() {
  return (
    <main>
      <h1 className="text-2xl font-bold">Welcome back Berat</h1>
      <Link href="/">Navigate to Dashboard</Link>
    </main>
  )
}
