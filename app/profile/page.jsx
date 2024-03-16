'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import profileDefeult from '@/assets/images/profile.png'
import { FaTrashAlt, FaPen, FaMapMarkerAlt } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/Spinner'
import { getPropertiesByUserId } from '@/utils/propertiesActions'
import { deleteProperty } from '@/utils/propertiesActions'
import { toast } from 'react-toastify';

export default function ProfilePage() {
    const { data: session } = useSession();
    const profileImage = session?.user?.image;
    const profileName = session?.user?.name;
    const profileEmail = session?.user?.email;
    const route = useRouter();

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session?.user?.id)
            getPropertiesByUserId(session.user.id)
                .then(res => setProperties(res))
                .catch(error => console.log(error))
                .finally(setLoading(false));

    }, [session])

    function handleDeleteProperty(propertyId) {

        const confirmed = window.confirm('Are you sure you want to delete this property?');

        if (!confirmed) return;
        
        deleteProperty(propertyId)
            .then(res => {
                if (res.status === 200) {
                    toast.success('Property deleted successfully 👌');
                    const updatedProperties = properties
                        .filter(property => property._id !== propertyId);
                    setProperties(updatedProperties);
                }
            })
            .catch(() =>toast.error('Failed to delete property!'));
    }

    return (
        <section className="bg-blue-50">
            <div className="container m-auto py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 mx-20 my-10">
                            <div className="mb-4">
                                <Image
                                    className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                                    src={profileImage || profileDefeult}
                                    alt="User"
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <h2 className="text-lg mb-4">
                                <span className="font-semibold block">Name: </span>
                                {profileName}
                            </h2>
                            <h2 className="text-lg">
                                <span className="font-semibold block">Email: </span>
                                {profileEmail}
                            </h2>
                        </div>

                        <div className="md:w-3/4 md:pl-4">
                            <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
                            {!loading && properties.length === 0 &&
                                (<p>You have no property listings</p>)}
                            {loading
                                ? (<Spinner loading={loading} />)
                                : (
                                    properties.map((property, index) =>
                                    (<div className="mb-10" key={index}>
                                        <Link href={`/properties/${property._id}`}>
                                            <Image
                                                className="h-32 w-full rounded-md object-cover"
                                                src={property.images[0]}
                                                alt={property.name}
                                                width={200}
                                                height={200}
                                                priority={true}
                                            />
                                        </Link>
                                        <div className="mt-2">
                                            <p className="text-lg">{property.name}</p>
                                            <p className="">
                                                {property.location.street}, {property.location.city} {property.location.state}
                                                <span className='mx-2'>
                                                    <FaMapMarkerAlt className='inline-block mb-2 text-red-700' />
                                                </span>

                                            </p>
                                        </div>
                                        <div className="mt-2">
                                            <button
                                                onClick={() => route.push(`/properties/${property._id}/edit`)}
                                                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600">
                                                <FaPen />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProperty(property._id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </div>))
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
