import express from 'express';
import errorHandler from './middleware/error.middleware.js';
let app = express();



// error handling middleware
app.use(errorHandler);

export default app;