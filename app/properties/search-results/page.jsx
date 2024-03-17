'use client'

import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import { getSearchProperties } from '@/utils/propertiesActions';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import SearchForm from '@/components/SearchForm';


export default function SearchResultsPage() {
    const searchParams = useSearchParams();

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const searchTerm = searchParams.get('searchTerm');
    const propertyType = searchParams.get('propertyType');

    useEffect(() => {
        getSearchProperties(searchTerm, propertyType)
            .then(res => setProperties(res))
            .catch(() => toast.error('Failed to fetch properties'))
            .finally(setLoading(false));
    }, [searchTerm, propertyType, getSearchProperties]);

    return (
        <>
            <section className='bg-blue-700 py-4'>
                <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
                    <SearchForm />
                </div>
            </section>
            {(loading ? (<Spinner loading={loading} />)
                : (
                    <section className="px-4 py-6" >
                        <div className="container-xl lg:container m-auto px-4 py-6">
                            <Link href='/' className='flex items-center text-blue-500 hover:underline mb-3'>
                                <FaArrowAltCircleLeft className='mr-2 mb-1' /> Back to Home
                            </Link>
                            <h1 className='text-2xl mb-10'>Searched Properties</h1>
                            {properties.length === 0
                                ? (<p>No search results found</p>) :
                                (<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {properties.map((property) => (
                                        <PropertyCard key={property._id} property={property} />
                                    ))}
                                </div>)}
                        </div>
                    </section >
                )
            )}
        </>
    )
}
