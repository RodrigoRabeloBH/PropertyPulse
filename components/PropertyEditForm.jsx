'use client';
import { useState, useEffect } from 'react';
import { propertyCreateModel } from '@/models/propertyCreateModel';
import { amenities } from '@/models/consts';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getPropertyById, updateProperty } from '@/utils/propertiesActions';

const PropertyEditForm = () => {
    const { id } = useParams();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [fields, setFields] = useState(propertyCreateModel);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
        getPropertyById(id)
            .then(res => {
                const propertyData = res;
                if (propertyData && propertyData.rates) {
                    const defaultRates = { ...propertyData.rates }
                    for (const rate in defaultRates) {
                        if (defaultRates[rate] === null)
                            defaultRates[rate] = '';
                    };
                    propertyData.rates = defaultRates;
                };
                setFields(res);
            })
            .catch(() => toast.error('Failed to fetch property'))
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Check if nested property
        if (name.includes('.')) {
            const [outerKey, innerKey] = name.split('.');

            setFields((prevFields) => ({
                ...prevFields,
                [outerKey]: {
                    ...prevFields[outerKey],
                    [innerKey]: value,
                },
            }));
        } else {
            // Not nested
            setFields((prevFields) => ({
                ...prevFields,
                [name]: value,
            }));
        }
    };
    const handleAmenitiesChange = (e) => {
        const { value, checked } = e.target;

        // Clone the current array
        const updatedAmenities = [...fields.amenities];

        if (checked) {
            // Add value to array
            updatedAmenities.push(value);
        } else {
            // Remove value from array
            const index = updatedAmenities.indexOf(value);

            if (index !== -1) {
                updatedAmenities.splice(index, 1);
            }
        }

        // Update state with updated array
        setFields((prevFields) => ({
            ...prevFields,
            amenities: updatedAmenities,
        }));
    };

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        updateProperty(id, formData)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Property updated successfully 👌');
                    router.push(`/properties/${id}`);
                }

                if (res.status === 401 || res.status === 403)
                    toast.error('Permission denied');

            }).catch(() => toast.error('Failed to upadate property'));
    }

    return (
        mounted && !loading && (
            <form autoComplete='off' onSubmit={(e => handleSubmit(e))}>
                <h2 className='text-3xl text-center font-semibold mb-6'>
                    Edit Property
                </h2>

                <div className='mb-4'>
                    <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>
                        Property Type
                    </label>
                    <select
                        id='type'
                        name='type'
                        className='border rounded w-full py-2 px-3'
                        required
                        value={fields.type}
                        onChange={handleChange}
                    >
                        <option value='Apartment'>Apartment</option>
                        <option value='Condo'>Condo</option>
                        <option value='House'>House</option>
                        <option value='Cabin Or Cottage'>Cabin or Cottage</option>
                        <option value='Room'>Room</option>
                        <option value='Studio'>Studio</option>
                        <option value='Other'>Other</option>
                    </select>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 font-bold mb-2' htmlFor='name'>
                        Listing Name
                    </label>
                    <input
                        autoComplete='off'
                        type='text'
                        id='name'
                        name='name'
                        className='border rounded w-full py-2 px-3 mb-2'
                        placeholder='eg. Beautiful Apartment In Miami'
                        required
                        value={fields.name}
                        onChange={handleChange}

                    />
                </div>
                <div className='mb-4'>
                    <label
                        htmlFor='description'
                        className='block text-gray-700 font-bold mb-2'
                    >
                        Description
                    </label>
                    <textarea
                        id='description'
                        name='description'
                        className='border rounded w-full py-2 px-3'
                        rows='4'
                        placeholder='Add an optional description of your property'
                        value={fields.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className='mb-4 bg-blue-50 p-4'>
                    <span className='block text-gray-700 font-bold mb-2'>Location</span>
                    <input
                        autoComplete='off'
                        type='text'
                        id='street'
                        name='location.street'
                        className='border rounded w-full py-2 px-3 mb-2'
                        placeholder='Street'
                        value={fields.location.street}
                        onChange={handleChange}
                    />
                    <input
                        autoComplete='off'
                        type='text'
                        id='city'
                        name='location.city'
                        className='border rounded w-full py-2 px-3 mb-2'
                        placeholder='City'
                        required
                        value={fields.location.city}
                        onChange={handleChange}
                    />
                    <input
                        autoComplete='off'
                        type='text'
                        id='state'
                        name='location.state'
                        className='border rounded w-full py-2 px-3 mb-2'
                        placeholder='State'
                        required
                        value={fields.location.state}
                        onChange={handleChange}
                    />
                    <input
                        autoComplete='off'
                        type='text'
                        id='zipcode'
                        name='location.zipcode'
                        className='border rounded w-full py-2 px-3 mb-2'
                        placeholder='Zipcode'
                        value={fields.location.zipcode}
                        onChange={handleChange}
                    />
                </div>

                <div className='mb-4 flex flex-wrap'>
                    <div className='w-full sm:w-1/3 pr-2'>
                        <label
                            htmlFor='beds'
                            className='block text-gray-700 font-bold mb-2'
                        >
                            Beds
                        </label>
                        <input
                            autoComplete='off'
                            type='number'
                            min={0}
                            id='beds'
                            name='beds'
                            className='border rounded w-full py-2 px-3'
                            required
                            value={fields.beds}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='w-full sm:w-1/3 px-2'>
                        <label
                            htmlFor='baths'
                            className='block text-gray-700 font-bold mb-2'
                        >
                            Baths
                        </label>
                        <input
                            autoComplete='off'
                            type='number'
                            min={0}
                            id='baths'
                            name='baths'
                            className='border rounded w-full py-2 px-3'
                            required
                            value={fields.baths}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='w-full sm:w-1/3 pl-2'>
                        <label
                            htmlFor='square_feet'
                            className='block text-gray-700 font-bold mb-2'
                        >
                            Square Feet
                        </label>
                        <input
                            autoComplete='off'
                            type='number'
                            min={0}
                            id='square_feet'
                            name='square_feet'
                            className='border rounded w-full py-2 px-3'
                            required
                            value={fields.square_feet}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className='mb-4'>
                    <span className='block text-gray-700 font-bold mb-2'>
                        Amenities
                    </span>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                        {amenities.map((a, index) => (
                            <div key={index}>
                                <input
                                    autoComplete='off'
                                    type='checkbox'
                                    id={a.id}
                                    name='amenities'
                                    value={a.value}
                                    className='mr-2 cursor-pointer'
                                    checked={fields.amenities.includes(a.value)}
                                    onChange={handleAmenitiesChange}
                                />
                                <label className='cursor-pointer' htmlFor={a.id}>{a.value}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='mb-4 bg-blue-50 p-4'>
                    <span className='block text-gray-700 font-bold mb-2'>
                        Rates (Leave blank if not applicable)
                    </span>
                    <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
                        <div className='flex items-center'>
                            <label htmlFor='weekly_rate' className='mr-2'>
                                Weekly
                            </label>
                            <input
                                autoComplete='off'
                                type='number'
                                min={0}
                                id='weekly_rate'
                                name='rates.weekly'
                                className='border rounded w-full py-2 px-3'
                                value={fields.rates.weekly}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex items-center'>
                            <label htmlFor='monthly_rate' className='mr-2'>
                                Monthly
                            </label>
                            <input
                                autoComplete='off'
                                type='number'
                                min={0}
                                id='monthly_rate'
                                name='rates.monthly'
                                className='border rounded w-full py-2 px-3'
                                value={fields.rates.monthly}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex items-center'>
                            <label htmlFor='nightly_rate' className='mr-2'>
                                Nightly
                            </label>
                            <input
                                autoComplete='off'
                                type='number'
                                min={0}
                                id='nightly_rate'
                                name='rates.nightly'
                                className='border rounded w-full py-2 px-3'
                                value={fields.rates.nightly}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className='mb-4'>
                    <label
                        htmlFor='seller_name'
                        className='block text-gray-700 font-bold mb-2'
                    >
                        Seller Name
                    </label>
                    <input
                        autoComplete='off'
                        type='text'
                        id='seller_name'
                        name='seller_info.name'
                        className='border rounded w-full py-2 px-3'
                        placeholder='Name'
                        value={fields.seller_info.name}
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-4'>
                    <label
                        htmlFor='seller_email'
                        className='block text-gray-700 font-bold mb-2'
                    >
                        Seller Email
                    </label>
                    <input
                        autoComplete='off'
                        type='email'
                        id='seller_email'
                        name='seller_info.email'
                        className='border rounded w-full py-2 px-3'
                        placeholder='Email address'
                        required
                        value={fields.seller_info.email}
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-4'>
                    <label
                        htmlFor='seller_phone'
                        className='block text-gray-700 font-bold mb-2'
                    >
                        Seller Phone
                    </label>
                    <input
                        autoComplete='off'
                        type='tel'
                        id='seller_phone'
                        name='seller_info.phone'
                        className='border rounded w-full py-2 px-3'
                        placeholder='Phone'
                        value={fields.seller_info.phone}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <button
                        className='bg-blue-500 hover:bg-blue-600 text-white font-bold 
                        py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                        type='submit'
                    >
                        Update Property
                    </button>
                </div>
            </form>
        )
    );
};
export default PropertyEditForm;