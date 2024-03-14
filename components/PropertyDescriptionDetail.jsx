import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';

export default function PropertyDescriptionDetail({ property }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-bold mb-6">Description & Details</h3>
            <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
                <p>
                    <FaBed className="inline-block mr-2" /> {property.beds}
                    <span className="hidden sm:inline ml-1">Beds</span>
                </p>
                <p>
                    <FaBath className="mr-2 inline-block" />{property.baths}
                    <span className="hidden sm:inline ml-1">Baths</span>
                </p>
                <p>
                    <FaRulerCombined className="mr-2 inline-block" />{property.square_feet}
                    <span className="hidden sm:inline ml-1">sqft</span>
                </p>
            </div>
            <p className="text-gray-500 mb-4 text-center">
                {property.description}
            </p>
        </div>
    )
}
