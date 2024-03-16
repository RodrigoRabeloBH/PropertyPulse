import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { createProperyData } from "@/utils/createProperyData";

// GET /api/properties/:id
export async function GET(request, { params }) {
    try {
        await connectDB();
        const property = await Property.findById(params.id);
        if (!property)
            return new Response('Not Found', { status: 404 });
        return new Response(JSON.stringify(property), { status: 200 });
    } catch (error) {
        return new Response('Something Went Wrong', { status: 500 });
    }
}

//DELETE /api/properties/:id
export async function DELETE(request, { params }) {
    try {
        const propertyId = params.id;
        const sessionUser = await getSessionUser();
        const { userId } = sessionUser;

        if (!sessionUser || !sessionUser.userId)
            return new Response('Unauthorized', { status: 401 })

        await connectDB();
        const property = await Property.findById(propertyId);

        if (!property)
            return new Response('Not Found', { status: 404 });

        if (property.owner.toString() !== userId)
            return new Response('Not allowed', { status: 403 })

        await property.deleteOne();
        return new Response({ deleted: true }, { status: 200 });

    } catch (error) {
        return new Response('Something Went Wrong', { status: 500 });
    }
}

//PUT /api/properties/:id
export async function PUT(request, { params }) {
    try {

        await connectDB();

        const sessionUser = await getSessionUser();
        const { userId } = sessionUser;
        const { id } = params;

        if (!sessionUser || !userId)
            return new Response('Unathorized', { status: 401 });

        const formData = await request.formData();
        const existingProperty = await Property.findById(id);

        if (!existingProperty)
            return new Response('Property does not exist', { status: 404 });

        if (existingProperty.owner.toString() !== userId)
            return new Response('User not allowed', { status: 403 });

        const propertyData = createProperyData(formData, userId, existingProperty.images);
        const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

        return new Response(JSON.stringify({ updatedProperty }), { status: 200 });

    } catch (error) {
        return new Response('Failed to add property', { status: 500 });
    }
}