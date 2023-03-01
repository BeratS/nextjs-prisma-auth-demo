import Link from "next/link";

export default async function Dashboard() {
  return (
    <main>
      <h1 className="text-2xl font-bold">Welcome to the dashboard</h1>
      <Link href={"/"}>Back Home</Link>
    </main>
  )
}
