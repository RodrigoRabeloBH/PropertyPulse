import mongose from 'mongoose'

let connected = false;

const connectDB = async () => {
    mongose.set('strictQuery', true);

    if (connected)
        return;

    try {
        await mongose.connect(process.env.MONGO_URI);
        connected = true;
    } catch (error) {
        console.error(error);
    }
};

export default connectDB;