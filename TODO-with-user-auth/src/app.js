import express from 'express';
import errorHandler from './middleware/error.middleware.js';
import notFound from './middleware/notFound.middleware.js';
let app = express();



// error handling middleware
app.use(errorHandler);
app.use(notFound);

export default app;