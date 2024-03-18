'use client'
import { FaBookmark } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { bookmarkProperty, chekBookmarkProperty } from '@/utils/propertiesActions';

export default function BookmarkButton({ property }) {

    const { data: session } = useSession();
    const userId = session?.user?.id;
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }
        chekBookmarkProperty(property._id)
            .then(res => setIsBookmarked(res.isBookmarked))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [property._id, userId]);

    function handleClick() {
        if (!userId) {
            toast.error('You need to sign in to bookmark a property');
            return;
        }
        bookmarkProperty(property._id)
            .then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        toast.success(data.message + ' 👌');
                        setIsBookmarked(data.isBookmarked);
                    });
                }
                if (res.status === 400) {
                    res.json().then(data => {
                        toast.warning(data.message + ' ☹️');
                        setIsBookmarked(data.isBookmarked);
                    });
                }
            }).catch(() => toast.error('Failed to bookmark property'));
    }

    if (loading) return <p className='text-center'>Loading ...</p>

    return isBookmarked ? (<button
        onClick={handleClick}
        className="bg-red-500 hover:bg-red-600 text-white font-bold w-full
                     py-2 px-4 rounded-full flex items-center justify-center">
        <FaBookmark className="mr-2" /> Remove Bookmark
    </button>) : (
        <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full
                         py-2 px-4 rounded-full flex items-center justify-center">
            <FaBookmark className="mr-2" /> Bookmark Property
        </button>
    )
}
