'use client'

import React, { useEffect, useState } from 'react'
import PropertyCard from '@/components/PropertyCard';
import { getProperties } from '@/utils/propertiesActions';
import Spinner from './Spinner';
import { toast } from 'react-toastify';
import Pagination from './Pagination';

export default function PropertiesList() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        getProperties(page, pageSize)
            .then(res => {
                setProperties(res.properties);
                setTotalItems(res.total);
            })
            .catch(() => toast.error('Failed to fetch properties'))
            .finally(() => setLoading(false));
    }, [page, pageSize]);

    function handlePageChange(newPage) {
        setPage(newPage);
    }

    return loading ? (<Spinner loading={loading} />) : (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                {properties.lengtgh === 0 ? (
                    <p>No properties found </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {properties.map((property) => (
                            <PropertyCard key={property._id} property={property} />
                        ))}
                    </div>
                )}
                <Pagination
                    page={page}
                    pageSize={pageSize}
                    totalItems={totalItems}
                    onPageChange={handlePageChange} />
            </div>
        </section>
    )
}
