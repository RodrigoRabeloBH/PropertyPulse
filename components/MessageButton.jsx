'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { FaEnvelope } from 'react-icons/fa'
import { getUnreadMessagesCount } from '@/utils/propertiesActions';
import { useUnreadMessagesCountStore } from '@/hooks/useUnreadMessagesCountStore';

export default function MessageButton(session) {
    const unreadMessagesCount = useUnreadMessagesCountStore(state => state.unreadMessagesCount);
    const setUnreadMessagesCount = useUnreadMessagesCountStore(state => state.setUnreadMessagesCount);

    useEffect(() => {
        if (!session) return;
        getUnreadMessagesCount()
            .then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        setUnreadMessagesCount(data.count);
                    })
                }
            }).catch(error => console.log(error));
    }, [session]);
    return (
        <Link href='/messages' className='relative group'>
            <button className='relative rounded-full bg-gray-600 p-2 text-white hover:text-gray-400 '>
                <FaEnvelope className='text-lg' />
            </button>
            {unreadMessagesCount > 0 && (
                <span
                    className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold
                 leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
                    {unreadMessagesCount}
                </span>
            )}
        </Link>
    )
}
