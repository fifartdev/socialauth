"use client";
import Image from "next/image";
import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT_URL)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

const account = new Account(client);

export default function Home() {
  const handleLogin = () => {
    account.createOAuth2Session(
      "github",
      process.env.NEXT_PUBLIC_SUCCESS_URL,
      process.env.NEXT_PUBLIC_FAILURE
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />

        <button onClick={handleLogin}>Login With Github</button>
      </div>
    </main>
  );
}
