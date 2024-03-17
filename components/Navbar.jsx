'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import LoginButton from './LoginButton';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';
import ProfileDropdown from './ProfileDropdown';
import MobileMenuButton from './MobileMenuButton';
import ProfileDropdownButton from './ProfileDropdownButton';
import MessageButton from './MessageButton';
import Logo from './Logo'
import { useSession, getProviders } from 'next-auth/react';


export default function Navbar() {
    const { data: session } = useSession();

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const pathname = usePathname();
    const [providers, setProviders] = useState(null);

    useEffect(() => {
        getProviders()
            .then(res => setProviders(res))
            .catch(error => console.log(error));
    }, []);

    return (
        <nav className='bg-blue-700 border-b border-blue-500 sticky top-0 z-50'>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                <div className='relative flex h-20 items-center justify-between'>
                    <div className='absolute inset-y-0 left-0 flex items-center md:hidden'>
                        <MobileMenuButton setMobileMenuOpen={setMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} />
                    </div>
                    <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
                        <Logo />
                        <DesktopMenu pathname={pathname} session={session} setMobileMenuOpen={setMobileMenuOpen} />
                    </div>
                    {!session && (
                        <div className='hidden md:block md:ml-6'>
                            <LoginButton providers={providers} />
                        </div>
                    )}
                    {session && (
                        <div className='absolute inset-y-0 right-0 flex items-center pr-2 md:pr-0'>
                            <MessageButton session={session} />
                            <div className='relative ml-3'>
                                <ProfileDropdownButton
                                    isProfileMenuOpen={isProfileMenuOpen}
                                    setProfileMenuOpen={setProfileMenuOpen}
                                    session={session} />
                                {isProfileMenuOpen && (<ProfileDropdown setProfileMenuOpen={setProfileMenuOpen} />)}
                            </div>
                        </div>
                    )}

                </div>
            </div>
            {isMobileMenuOpen
                &&
                (<MobileMenu
                    session={session}
                    pathname={pathname}
                    providers={providers}
                    setMobileMenuOpen={setMobileMenuOpen} />
                )}
        </nav>
    )
}
