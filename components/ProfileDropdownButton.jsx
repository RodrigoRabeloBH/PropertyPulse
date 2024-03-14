import React from 'react'
import Image from 'next/image'
import profileDefault from '@/assets/images/profile.png';


export default function ProfileDropdownButton({ setProfileMenuOpen, isProfileMenuOpen, session }) {
    const profileImage = session?.user?.image;
    return (
        <div>
            <button
                type='button'
                className='relative flex rounded-full focus:ring-offset-2 focus:ring-offset-gray-800'
                onClick={() => { setProfileMenuOpen(!isProfileMenuOpen) }}
            >
                <Image
                    className='h-8 w-8 rounded-full'
                    src={profileImage || profileDefault}
                    alt='profile image'
                    width={40}
                    height={40}
                />
            </button>
        </div>
    )
}
