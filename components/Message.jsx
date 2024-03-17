'use client'

import React, { useState } from 'react'
import { HiTrash, HiMailOpen, HiMail } from 'react-icons/hi';
import Link from 'next/link'
import { markAsRead } from '@/utils/propertiesActions';
import { toast } from 'react-toastify';
import { useUnreadMessagesCountStore } from '@/hooks/useUnreadMessagesCountStore';

export default function Message({ message, handleDeleteMessage }) {
    const [isRead, setIsRead] = useState(message.read);
    const increaseCount = useUnreadMessagesCountStore(state => state.increaseCount);
    const decreaseCount = useUnreadMessagesCountStore(state => state.decreaseCount);

    function handleMarkAsRead(messageId) {
        markAsRead(messageId)
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then(data => {
                            toast.success(data.message + ' 👌');
                            setIsRead(!data.updatedMessage.read);

                            if (data.updatedMessage.read)
                                increaseCount();
                            else
                                decreaseCount();
                        });
                } else if (res.status === 404) {
                    res.json().then(data => toast.warning(data.message));
                } else if (res.status === 401) {
                    res.json().then(data => toast.error(data.message));
                } else {
                    toast.error('Failed to update message');
                }
            }).catch(() => toast.error('Failed to update message'));
    }

    return (
        <div className='space-y-4 my-4'>
            <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
                {!isRead && (
                    <div
                        className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-sm'>
                        New
                    </div>
                )}
                <h2 className='mb-4 '>
                    <span className='font-semibold'>Property Inquiry: {message?.property?.name}</span>
                </h2>
                <p className='text-gray-700'>{message?.body}</p>
                <ul className='mt-4'>
                    <li>
                        <span className='font-semibold mr-2'>Name:</span>
                        {message?.sender?.username}
                    </li>
                    <li>
                        <span className='font-semibold mr-2'>Reply Email:</span>
                        <Link href={`mailto:${message?.email}`} className='text-blue-500'>
                            {message?.email}
                        </Link>
                    </li>
                    <li>
                        <span className='font-semibold mr-2'>Reply Phone:</span>
                        <Link href={`tel:${message?.phone}`} className='text-blue-500'>
                            {message?.phone}
                        </Link>
                    </li>
                    <li>
                        <span className='font-semibold mr-2'>Received:</span>
                        {new Date(message?.createdAt).toLocaleString()}
                    </li>
                </ul>
                <button
                    className={`mt-4 mr-3 ${isRead ? 'bg-gray-300' : 'bg-blue-500 text-white'}  py-1 px-3 rounded-md`}
                    onClick={() => handleMarkAsRead(message?._id)}>
                    {isRead
                        ? (<HiMailOpen className='inline-block mb-1 mr-1' />)
                        : (<HiMail className='inline-block mb-1 mr-1' />)}
                    <span>{isRead ? 'Mark As New' : 'Mark As Read'} </span>
                </button>
                <button
                    className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'
                    onClick={() => handleDeleteMessage(message?._id)}>
                    <HiTrash className='inline-block mb-1 mr-1' />
                    <span>Delete</span>
                </button>
            </div>
        </div>
    )
}
