import React from 'react'

export default function MobileMenuButton({ setMobileMenuOpen, isMobileMenuOpen }) {
    return (
        <button
            className='relative inline-flex rounded-md p-2 bg-blue-800 text-white hover:bg-blue-600 '
            onClick={() => { setMobileMenuOpen(!isMobileMenuOpen) }}>
            <svg className='block h-6 w-6' strokeWidth='1.5' stroke='currentColor'>
                <path d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
            </svg>
        </button>
    )
}
