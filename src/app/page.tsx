"use client"
import '../styles/globals.css'
import { useRouter } from "next/navigation";
import CodeEditor  from "./components/CodeEditor"
import LandingEditor from "./components/LandingEditor"

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

      <button className="text-blue" onClick={handleLogin}>Login</button>
      <button onClick={handleSignUp}>Sign Up</button>
      
      <LandingEditor/>

    </div>
  );
}
