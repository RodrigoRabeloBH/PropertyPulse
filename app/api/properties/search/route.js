import connectDB from "@/config/database";
import Property from "@/models/Property";

//GET /api/properties/search

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const searchTerm = searchParams.get('searchTerm');
        const propertyType = searchParams.get('propertyType');

        let query = {};

        if (searchTerm && searchTerm !== undefined) {
            const searchPattern = new RegExp(searchTerm, 'i');
            query = {
                $or: [
                    { name: searchPattern },
                    { description: searchPattern },
                    { 'location.city': searchPattern },
                    { 'location.state': searchPattern },
                    { 'location.street': searchPattern },
                    { 'location.zipcode': searchPattern }
                ]
            };
        }

        if (propertyType && propertyType !== 'All') {
            const typePattern = new RegExp(propertyType, 'i');
            query.type = typePattern;
        }

        const properties = await Property.find(query);

        return new Response(JSON.stringify(properties), { status: 200 });

    } catch (error) {
        throw new Error(error);
    }
}