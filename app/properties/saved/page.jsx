'use client'

import Spinner from '@/components/Spinner';
import { getBookmarkedProperties } from '@/utils/propertiesActions';
import React, { useEffect, useState } from 'react'
import PropertyCard from '@/components/PropertyCard';

export default function SavedPropertiesPage() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBookmarkedProperties()
            .then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        setProperties(data);
                    })
                }
            }).catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    return loading ?
        (<Spinner loading={loading} />)
        : (
            <section className="px-4 py-6">
                <div className="container-xl lg:container m-auto px-4 py-6">
                    <h1 className='text-2xl mb-10'>Bookmarked Properties</h1>
                    {properties.lengtgh === 0 || properties.lengtgh === undefined ? (
                        <p>No property was Bookmarked </p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {properties.map((property) => (
                                <PropertyCard key={property._id} property={property} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        )
}
