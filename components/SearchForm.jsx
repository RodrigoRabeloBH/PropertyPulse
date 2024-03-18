'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { options } from '@/models/consts';

export default function SearchForm() {
    const [searchTerm, setSearchTerm] = useState('');
    const [propertyType, setPropertyType] = useState('All');
    const router = useRouter();

    function handleSubmit(e) {
        e.preventDefault();
        if (searchTerm === '' && propertyType === 'All')
            router.push('/properties');
        else {
            const query = `?searchTerm=${searchTerm}&propertyType=${propertyType}`;
            router.push(`/properties/search-results${query}`);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
            id='form' autoComplete='off'>
            <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
                <input
                    type="text"
                    id='searchs'
                    placeholder="Enter Location (City, State, Zip, etc"
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
                    autoComplete='off'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="w-full md:w-2/5 md:pl-2">
                <select id='select'
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                >
                    {options.map(option =>
                    (<option value={option.value} key={option.key}>
                        {option.value}
                    </option>))}
                </select>
            </div>
            <button
                type="submit"
                id='button'
                className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500
             text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
            >
                Search
            </button>
        </form>
    )
}
