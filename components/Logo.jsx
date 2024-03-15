import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import propertyPulseLogo from '@/assets/images/logo-white.png';

export default function Logo() {
    return (
        <Link className='flex flex-shrink-0 items-center' href='/'>
            <Image
                className='h-10 w-auto'
                src={propertyPulseLogo}
                alt='Property Pulse logo'
                priority
            />
            <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                PropertyPulse
            </span>
        </Link>
    )
}
