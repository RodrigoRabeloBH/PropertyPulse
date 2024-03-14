import React from 'react';
import Link from 'next/link';

export default function DesktopMenu({ pathname, session }) {
    return (
        <div className='hidden md:ml-6 md:block'>
            <div className='flex space-x-2'>
                <Link
                    href='/'
                    className={`${pathname === '/' ? 'text-white' : 'text-blue-400'}  hover:text-white rounded-md px-3 py-2`}
                >
                    Home
                </Link>
                <Link
                    href='/properties'
                    className={`${pathname === '/properties' ? 'text-white' : 'text-blue-400'}   hover:text-white rounded-md px-3 py-2`}
                >
                    Properties
                </Link>
                {session && (
                    <Link
                        href='/properties/add'
                        className={`${pathname === '/properties/add' ? 'text-white' : 'text-blue-400'}   hover:text-white rounded-md px-3 py-2`}
                    >
                        Add Property
                    </Link>
                )}
            </div>
        </div>
    )
}
