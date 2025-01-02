"use client"

import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  function handleLogin() {
    router.push('/login')
  }

  function handleSignUp() {
    router.push('/signup')
  }
  
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}
