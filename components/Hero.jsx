import React from 'react'

const options = [
    { key: 1, value: 'All' },
    { key: 2, value: 'Apartment' },
    { key: 3, value: 'Studio' },
    { key: 4, value: 'Condo' },
    { key: 5, value: 'Cabin or Cottage' },
    { key: 6, value: 'Loft' },
    { key: 7, value: 'Room' },
    { key: 8, value: 'Other' },
];

export default function Hero() {

    return (
        <section className="bg-blue-700 py-20 mb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                        Find The Perfect Rental
                    </h1>
                    <p className="my-4 text-xl text-white">
                        Discover the perfect property that suits your needs.
                    </p>
                </div>
                <form className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center" id='form' autoComplete='off'>
                    <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
                        <input
                            type="text"
                            id='searchs'
                            placeholder="Enter Location (City, State, Zip, etc"
                            className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="w-full md:w-2/5 md:pl-2">
                        <select id='select'
                            className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
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
            </div>
        </section>
    )
}
