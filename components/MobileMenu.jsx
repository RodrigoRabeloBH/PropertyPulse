import LoginButton from "./LoginButton"
import Link from "next/link";

export default function MobileMenu({ session, pathname, providers, setMobileMenuOpen }) {
    return (
        <div className='md:hidden' id='mobile-menu'>
            <div className='space-y-1 px-2 pb-3 pt-2'>
                <Link
                    href='/'
                    className={`${pathname === '/' ? 'text-white' : 'text-blue-400'}  block rounded-md px-3 
                                py-2 text-base font-medium hover:text-white`}
                    onClick={() => setMobileMenuOpen(false)}
                >
                    Home
                </Link>
                <Link
                    href='/properties'
                    className={`${pathname === '/properties' ? 'text-white' : 'text-blue-400'}  
                                block rounded-md px-3 py-2 text-base font-medium hover:text-white`}
                    onClick={() => setMobileMenuOpen(false)}
                >
                    Properties
                </Link>
                {session && (
                    <Link
                        href='/properties/add'
                        className={`${pathname === '/properties/add' ? 'text-white' : 'text-blue-400'} 
                                     block rounded-md px-3 py-2 text-base font-medium hover:text-white`}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Add Property
                    </Link>
                )}
                {!session && (
                    <LoginButton providers={providers} />
                )}
            </div>
        </div>
    )
}
