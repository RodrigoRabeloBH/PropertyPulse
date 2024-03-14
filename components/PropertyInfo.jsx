import { FaBookmark, FaShare } from 'react-icons/fa';
import PropertyDescriptionDetail from './PropertyDescriptionDetail';
import PropertyLocationAndRates from './PropertyLocationAndRates';
import PropertyAmenities from './PropertyAmenities';
import ContactForm from './ContactForm';

export default function PropertyInfo({ property }) {
    return (
        <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
                <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                    <main>
                        <PropertyLocationAndRates property={property} />
                        <PropertyDescriptionDetail property={property} />
                        <PropertyAmenities property={property} />
                        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                            <div id="map"></div>
                        </div>
                    </main>
                    <aside className="space-y-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                            <FaBookmark className="mr-2" /> Bookmark Property
                        </button>
                        <button
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
                        >
                            <FaShare className="mr-2" /> Share Property
                        </button>
                        <ContactForm />
                    </aside>
                </div>
            </div>
        </section>
    )
}
