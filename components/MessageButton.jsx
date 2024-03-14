import React from 'react'
import Link from 'next/link'
import { FaEnvelope } from 'react-icons/fa'

export default function MessageButton() {
    return (
        <Link href='/messages' className='relative group'>
            <button className='relative rounded-full bg-gray-600 p-2 text-white hover:text-gray-400 '>
                <FaEnvelope className='text-lg' />
            </button>
            <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold
                         leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
                5
            </span>
        </Link>
    )
}
