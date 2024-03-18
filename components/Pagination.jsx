'use client'

import React from 'react'
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi'

export default function Pagination({ page, pageSize, totalItems, onPageChange }) {
    const totalPages = Math.ceil(totalItems / pageSize);

    function handlePageChange(newPage) {
        if (newPage >= 1 && newPage <= totalPages)
            onPageChange(newPage);
    }

    return (
        <section className='container mx-auto flex justify-center items-center my-8'>
            <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className='mr-2 px-2 py-1 border  rounded bg-blue-500'>
                <HiArrowNarrowLeft className='text-white text-xl' />
            </button>
            <span className='mx-2 text-gray-500'>
                Page {page}  of  {totalPages}
            </span>
            <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className='ml-2 px-2 py-1 border  bg-blue-500 rounded'>
                <HiArrowNarrowRight className='text-white text-xl' />
            </button>
        </section >
    )
}
