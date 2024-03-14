import '@/assets/styles/globals.css'
import AuthProvider from '@/components/AuthProvider';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const metadata = {
    title: 'Property Pulse | Find The Perfect Rental',
    description: 'Find your dream rental property',
    keywords: 'rental, find rentals, find properties',
    icons: {
        icon: [{ rel: "icon", type: "ico", url: '/favicon.ico' }]
    },
}

const MainLayout = ({ children }) => {
    return (
        <AuthProvider >
            <html lang='en'>
                <body>
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                </body>
            </html>
        </AuthProvider>
    )
}

export default MainLayout;