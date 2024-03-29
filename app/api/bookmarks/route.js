import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";



export const dynamic = 'force-dynamic';

// GET api/bookmarks
export async function GET(request) {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId)
            return new Response('Unauthorized', { status: 401 });

        const { userId } = sessionUser;

        const user = await User.findOne({ _id: userId });
        
        const bookmarkProperties = await Property.find({_id: {$in: user.bookmarks}}); 

        return new Response(JSON.stringify(bookmarkProperties), { status: 200 });

    } catch (error) {
        return new Response(error, { status: 500 });
    }
}

// POST api/bookmarks
export const POST = async (request) => {
    try {
        await connectDB();

        const { propertyId } = await request.json();
        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId)
            return new Response('Unauthorized', { status: 401 });

        const { userId } = sessionUser;

        const user = await User.findOne({ _id: userId });
        const property = await Property.findById(propertyId);

        if (property.owner.toString() === userId)
            return new Response(JSON.stringify({ message: 'You can not bookmark your own property' }), { status: 400 });

        let isBookmarked = user.bookmarks.includes(propertyId);
        let message;

        if (isBookmarked) {
            user.bookmarks.pull(propertyId);
            message = 'Bookmark removed successfully';
            isBookmarked = false;
        } else {
            user.bookmarks.push(propertyId);
            message = 'Bookmark added successfully';
            isBookmarked = true;
        }

        await user.save();
        return new Response(JSON.stringify({ message, isBookmarked }), { status: 200 });

    } catch (error) {
        return new Response(error, { status: 500 });
    }
}