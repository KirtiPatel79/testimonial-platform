import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Testimonial Platform</h1>
      {session ? (
        <>
          <p className="mb-4">Signed in as {session.user.email}</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
          <Link href="/dashboard">
            <a className="ml-4 bg-blue-500 text-white px-4 py-2 rounded">Go to Dashboard</a>
          </Link>
        </>
      ) : (
        <>
          <p className="mb-4">Not signed in</p>
          <button
            onClick={() => signIn()}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </>
      )}
    </div>
  );
}
