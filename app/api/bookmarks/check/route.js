import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

// POST api/bookmarks/check

export const dynamic = 'force-dynamic';

export const POST = async (request) => {
    try {
        await connectDB();

        const { propertyId } = await request.json();
        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId)
            return new Response('Unauthorized', { status: 401 });

        const { userId } = sessionUser;
        const user = await User.findOne({ _id: userId });

        let isBookmarked = user.bookmarks.includes(propertyId);

        await user.save();
        return new Response(JSON.stringify({ isBookmarked }), { status: 200 });

    } catch (error) {
        return new Response(error, { status: 500 });
    }
}