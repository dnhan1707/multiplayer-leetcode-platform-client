import React from 'react';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import * as dotenv from 'dotenv';

dotenv.config();

type NavProps = {
    onRun: () => void;
    onSubmit : () => void;
};

const Navbar : React.FC<NavProps> = ({ onRun, onSubmit}) => {
    const router = useRouter();
    
    const handleLogin = () => {
        router.push('/login')
    }

    const handleSignUp = () => {
    router.push('/signup')
    }


    return(
        <div className="flex items-center justify-between p-4">
            <div className='flex gap-x-4 justify-center flex-1'>
                <button className="text-gray-400 border rounded-md border-white px-4 py-2 hover:text-white" onClick={onRun}>
                    Run
                </button>
                <button className="text-gray-400 border rounded-md border-white px-4 py-2 hover:text-white" onClick={onSubmit}>
                    Submit
                </button>
            </div>

            <div className="flex gap-x-4">
                <button className="text-gray-400 border rounded-md border-white px-4 py-2 hover:text-white">Login</button>
                <button className="text-gray-400 border rounded-md border-white px-4 py-2 hover:text-white">Signup</button>
            </div>
        </div>

    )
}

export default Navbar;