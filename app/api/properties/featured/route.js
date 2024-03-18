import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/feature
export async function GET(request) {
    try {

        await connectDB();

        const properties = await Property.find({
            is_feature: true
        });

        return new Response(JSON.stringify(properties), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}
