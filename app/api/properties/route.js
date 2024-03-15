import connectDB from "@/config/database";
import Property from "@/models/Property";
import { createProperyData } from "@/utils/createProperyData";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";


// GET /api/properties
export async function GET(request) {
    try {
        await connectDB();
        const properties = await Property.find({});
        return new Response(JSON.stringify(properties), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Something Went Wrong', { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const session = await getSessionUser();

        if (!session || !session.userId)
            return new Response('Unathorized', { status: 401 });

        const formData = await request.formData();
        const images = formData
            .getAll('images')
            .filter(img => img.name !== '')

        const imagesUploadPromises = [];
        let uploadedImages = []

        for (const img of images) {
            const imageBuffer = await img.arrayBuffer();
            const imageArray = Array.from(new Uint8Array(imageBuffer));
            const imageData = Buffer.from(imageArray);

            const imageBase64 = imageData.toString('base64');
            const result = await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`,
                { folder: 'PropertyPulse' }
            );

            imagesUploadPromises.push(result.secure_url);
            uploadedImages = await Promise.all(imagesUploadPromises);
        }

        const propertyData = createProperyData(formData, session.userId, uploadedImages);
        const newProperty = new Property(propertyData);

        await newProperty.save();

        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);

        // return new Response(JSON.stringify({ created: true }), { status: 201 });

    } catch (error) {
        return new Response('Failed to add property', { status: 500 });
    }
}