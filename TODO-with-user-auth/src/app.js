import express from 'express';
import errorHandler from './middleware/error.middleware.js';
import notFound from './middleware/notFound.middleware.js';
import authRoutes from './routes/auth.routes.js';
import notesRoutes from './routes/notes.routes.js';
let app = express();

// middleware to parse JSON request bodies
app.use(express.json());

// importing routes
app.use('/api/auth',authRoutes);
app.use('/api/notes',notesRoutes);


// error handling middleware
app.use(notFound);
app.use(errorHandler);


export default app;