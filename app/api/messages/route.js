import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

// GET /api/messages
export async function GET(request) {
    try {
        await connectDB();
        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.user)
            return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });

        const { userId } = sessionUser;

        const readMessages = await Message
            .find({ recipient: userId, read: true })
            .sort({ createdAt: -1 })
            .populate('sender', 'username')
            .populate('property', 'name');

        const unreadMessages = await Message
            .find({ recipient: userId, read: false })
            .sort({ createdAt: -1 })
            .populate('sender', 'username')
            .populate('property', 'name');

        const messages = [...unreadMessages, ...readMessages];

        return new Response(JSON.stringify({ messages }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to fetch messages' }), { status: 500 });
    }
}

// POST /api/messages
export async function POST(request) {
    try {
        await connectDB();

        const { name, email, phone, message, property, recipient } = await request.json();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.user)
            return new Response(JSON.stringify({ message: 'You must be logged in to send a message' }), { status: 401 });

        const { user } = sessionUser;

        if (user.id === recipient)
            return new Response(JSON.stringify({ message: 'Can not send a message to yourself' }), { status: 400 });

        const newMessage = new Message({
            sender: user.id,
            recipient,
            property,
            email,
            phone,
            name,
            body: message
        });

        await newMessage.save();
        return new Response(JSON.stringify({ message: 'Message Sent successfully' }), { status: 201 });

    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}