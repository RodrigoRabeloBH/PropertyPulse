'use client'
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import PropertyInfo from '@/components/PropertyInfo';
import { getPropertyById } from '@/utils/propertiesActions';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import Spinner from '@/components/Spinner';

export default function PropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id)
      return;
    if (property === null) {
      getPropertyById(id)
        .then(res => {
          setProperty(res);
        })
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }

  }, [id, property]);

  if (!property && !loading)
    return (<h1 className='text-center text-2xl font-bold'>Property Not Found</h1>);

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link href={'/properties'} className="text-blue-500 hover:text-blue-600 flex items-center">
                <FaArrowLeft className='mr-2' /> Back to Properties
              </Link>
            </div>
          </section>
          <PropertyInfo property={property} />
        </>
      )}
    </>
  )
}
