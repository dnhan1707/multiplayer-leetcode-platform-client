import React from 'react';
import Link from 'next/link'
import { useRouter } from "next/navigation";

type Props = {};

const Navbar : React.FC<Props> = () => {
    const router = useRouter();

    const handleLogin = () => {
        router.push('/login')
    }

    const handleSignUp = () => {
    router.push('/signup')
    }


    return(
        <div className='flex items-center justify-end p-3'>
			{/* <Link href='/' className='flex items-center justify-center h-20'>
				<Image src='/logo.png' alt='LeetClone' height={200} width={200} />
			</Link> */}
			<div className='flex items-center'>
				<button
					className='bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
                hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange border-2 border-transparent
                transition duration-300 ease-in-out
                '
					onClick={handleLogin}
				>
					Login
				</button>
                <button
					className='bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
                hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange border-2 border-transparent
                transition duration-300 ease-in-out
                '
					onClick={handleSignUp}
				>
					Sign Up
				</button>
			</div>
		</div>

    )
}

export default Navbar;