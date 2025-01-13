"use client"
import '../styles/globals.css'
import { useRouter } from "next/navigation";
import LandingEditor from "./components/Editor/LandingEditor"
import Workspace from './components/Workspace/workspace';
import Navbar from './components/Navbar/Navbar';

export default function Home() {

  return (
    <div className="space-y-4 bg-black text-white">
      <Navbar/>
      <Workspace/>
    </div>
  );
}
