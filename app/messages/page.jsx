'use client'

import Message from '@/components/Message';
import Spinner from '@/components/Spinner';
import { getMessages, deleteMessage } from '@/utils/propertiesActions';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react'

export default function MessagePage() {
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getMessages()
            .then(res => {
                if (res.status === 200) {
                    res.json().then(data => setMessages(data.messages));
                }
            }).catch(() => toast.error('Failed to fetch messages'))
            .finally(() => setLoading(false));
    }, []);

    function handleDeleteMessage(messageId) {
        deleteMessage(messageId)
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then(data => {
                            const newMessages = messages.filter(message => message._id !== messageId);
                            setMessages(newMessages);
                            toast.success(data.message + ' 👌');

                        });
                } else if (res.status === 401) {
                    res.json()
                        .then(data => toast.error(data.message));
                } else if (res.status === 403) {
                    res.json()
                        .then(data => toast.error(data.message));
                } else {
                    toast.error('Failed to delete message');
                }
            })
            .catch(() => toast.error('Failed to delete message'));
    }

    return (
        loading
            ? (<Spinner loading={loading} />)
            : messages.length === 0
                ? (
                    <div className='container mx-auto py-20'>
                        <h2 className='text-gray-700 text-2xl'>You have no messages</h2>
                    </div>
                )
                : (<section className='bg-blue-50'>
                    <div className='container m-auto py-24 max-w-6xl'>
                        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
                            <h1 className='text-2xl font-semibold mb-4'>Your Messages</h1>
                            {messages.map((message, index) => (
                                <Message
                                    message={message}
                                    key={index}
                                    handleDeleteMessage={handleDeleteMessage}
                                />
                            ))}
                        </div>
                    </div>
                </section>)
    )
}
