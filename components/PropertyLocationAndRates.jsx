import { FaMapMarker, FaTimes } from 'react-icons/fa';

export default function PropertyLocationAndRates({ property }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <div className="text-gray-500 mb-4 font-bold text-lg">{property.type}</div>
            <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
            <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                <FaMapMarker className=" text-lg text-orange-700 mr-2" />
                <p className="text-orange-700">
                    {property.location.street} , {property.location.city} {property.location.state}
                </p>
            </div>

            <h3 className="text-lg font-bold my-6 bg-blue-500 text-white p-2">
                Rates & Options
            </h3>
            <div className="flex flex-col md:flex-row justify-around">
                {property.rates.nightly
                    ? (<div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">Nightly</div>
                        <div className="text-2xl font-bold text-blue-500">${property.rates.nightly.toLocaleString()}</div>
                    </div>
                    )
                    : (<div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">Nightly</div>
                        <FaTimes className='text-red-700 text-xl' />
                    </div>)}
                {property.rates.weekly
                    ? (<div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">Weekly</div>
                        <div className="text-2xl font-bold text-blue-500">${property.rates.weekly.toLocaleString()}</div>
                    </div>
                    )
                    : (<div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">Weekly</div>
                        <FaTimes className='text-red-700 text-xl' />
                    </div>)}
                {property.rates.monthly
                    ? (<div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">Monthly</div>
                        <div className="text-2xl font-bold text-blue-500">${property.rates.monthly.toLocaleString()}</div>
                    </div>
                    )
                    : (<div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">Monthly</div>
                        <FaTimes className='text-red-700 text-xl' />
                    </div>)}

            </div>
        </div>

    )
}
