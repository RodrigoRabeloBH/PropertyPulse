import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

//GET /api/messages/unread-count
export async function GET(request) {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.user)
            return new Response(JSON.stringify({ messase: 'Unauthorized' }), { status: 401 });

        const { userId } = sessionUser;

        const unreadMessagesCount = await Message.countDocuments({
            recipient: userId,
            read: false
        });

        return new Response(JSON.stringify({ count: unreadMessagesCount }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error }), { status: 500 });
    }
}