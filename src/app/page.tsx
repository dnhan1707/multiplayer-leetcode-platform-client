"use client"
import '../styles/globals.css'
import { useRouter } from "next/navigation";
import LandingEditor from "./components/Editor/LandingEditor"

export default function Home() {
  const router = useRouter();

  function handleLogin() {
    router.push('/login')
  }

  function handleSignUp() {
    router.push('/signup')
  }
  
  return (
    <div className="space-y-4">
      <div className = "space-x-4 wt-1">
        <button className='bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded' onClick={handleLogin}>Login</button>
        <button className='bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded' onClick={handleSignUp}>Sign Up</button>
      </div>

      <LandingEditor/>
    </div>
  );
}
