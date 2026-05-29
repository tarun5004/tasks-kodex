import app from './src/app.js';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';


dotenv.config();

await connectDB();


let PORT = process.env.PORT || 3000;

let server = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

server();
