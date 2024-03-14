import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { FaSignOutAlt, FaUserEdit, FaHome } from 'react-icons/fa'

export default function ProfileDropdown({ setProfileMenuOpen }) {
    return (
        <div className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-100 py-1'>
            <Link
                href='/profile'
                className='block px-4 py-2 text-sm text-blue-900 font-semibold hover:text-blue-700'
                onClick={() => setProfileMenuOpen(false)}
            >
                <FaUserEdit className='inline-block mr-1' /> Your Profile
            </Link>
            <Link
                href='/properties/saved'
                className='block px-4 py-2 text-sm text-blue-900 font-semibold hover:text-blue-700'
                onClick={() => setProfileMenuOpen(false)}
            >
                <FaHome className='inline-block mr-1' /> Saved Properties
            </Link>
            <button
                onClick={() => {
                    setProfileMenuOpen(false);
                    signOut();
                }}
                className='block px-4 py-2 text-sm text-blue-900 font-semibold hover:text-blue-700'>
                <FaSignOutAlt className='inline-block mr-1' />Sign Out
            </button>
        </div>
    )
}
