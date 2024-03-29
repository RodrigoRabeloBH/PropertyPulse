'use client'

import { sendMessage } from '@/utils/propertiesActions';
import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function ContactForm({ property }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [phone, setPhone] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            name,
            email,
            message,
            phone,
            recipient: property.owner,
            property: property._id
        };

        sendMessage(data)
            .then(res => {
                if (res.status === 201) {
                    res.json().then(data => {
                        toast.success(data.message + ' 👌');
                    });
                }
                else if (res.status === 400 || res.status === 401) {
                    res.json().then(data => {
                        toast.warning(data.message);
                    });
                }
                else {
                    toast.error('Failed to send message');
                }
            }).
            catch(() => toast.error('Failed to send message'))
            .finally(() => {
                setName('');
                setEmail('');
                setPhone('');
                setMessage('');
            });
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
            <form autoComplete='off' onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='name'
                    >
                        Name:
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='name'
                        type='text'
                        placeholder='Enter your name'
                        required
                        autoComplete='off'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        autoComplete='off'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='mb-4'>
                    <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='phone'
                    >
                        Phone:
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='phone'
                        type='text'
                        placeholder='Enter your phone number'
                        autoComplete='off'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="message"
                    >
                        Message:
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                        id="message"
                        placeholder="Enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                        type="submit"
                    >
                        <FaPaperPlane className="mr-2" /> Send Message
                    </button>
                </div>
            </form>
        </div>
    )
}
