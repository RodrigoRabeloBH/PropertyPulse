import Image from 'next/image'
import React from 'react'
import logo from '@/assets/images/logo-white.png';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-blue-500 py-8 mt-auto">
            <div
                className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4"
            >
                <div className="mb-4 md:mb-0">
                    <Link href={'/'}>
                        <Image src={logo} alt="Logo" className="h-8 w-auto" />
                    </Link>
                </div>
                <div>
                    <p className="text-sm text-white mt-2 md:mt-0">
                        &copy; 2024 PropertyPulse. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
