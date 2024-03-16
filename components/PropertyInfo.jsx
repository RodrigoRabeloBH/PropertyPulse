import PropertyDescriptionDetail from './PropertyDescriptionDetail';
import PropertyLocationAndRates from './PropertyLocationAndRates';
import PropertyAmenities from './PropertyAmenities';
import ContactForm from './ContactForm';
import PropertyMap from './PropertyMap';
import PropertyImages from './PropertyImages';
import BookmarkButton from './BookmarkButton';
import ShareButton from './ShareButton';

export default function PropertyInfo({ property }) {
    return (
        <>
            <section className="bg-blue-50">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                        <main>
                            <PropertyLocationAndRates property={property} />
                            <PropertyDescriptionDetail property={property} />
                            <PropertyAmenities property={property} />
                            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                <PropertyMap property={property} />
                            </div>
                        </main>
                        <aside className="space-y-4">
                            <BookmarkButton property={property} />
                            <ShareButton property={property} />
                            <ContactForm />
                        </aside>
                    </div>
                </div>
            </section>
            <PropertyImages images={property.images} />
        </>
    )
}
