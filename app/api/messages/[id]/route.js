import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

//PUT /api/messages/:id

export async function PUT(request, { params }) {
    try {
        await connectDB();
        const messageId = params.id;
        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.user)
            return new Response(JSON.stringify({ messase: 'Unauthorized' }), { status: 401 });

        const message = await Message.findById(messageId);

        if (!message)
            return new Response(JSON.stringify({ messase: 'Message not found' }), { status: 404 });

        message.read = !message.read;

        const updatedMessage = await Message.findByIdAndUpdate(messageId, message);

        return new Response(JSON.stringify({ message: 'Message updated successfully', updatedMessage }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error }), { status: 500 });
    }
}

// DELETE /api/messages/:id
export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const messageId = params.id;
        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.user)
            return new Response(JSON.stringify({ messase: 'Unauthorized' }), { status: 401 });

        await connectDB();

        const message = await Message.findById(messageId);

        if (message.recipient._id.toString() !== sessionUser.user.id)
            return new Response(JSON.stringify({ messase: 'Not allowed' }), { status: 403 });

        await message.deleteOne();

        return new Response(JSON.stringify({ message: 'Messsage deleted successfully', deleted: true }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error }), { status: 500 });
    }
}