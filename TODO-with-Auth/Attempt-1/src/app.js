import express from "express";
import todoRoutes from './routes/todo.routes.js';
import notFound from './middlewares/notFound.middleware.js';
import errorHandler from './middlewares/error.middleware.js';

let app = express();


app.use(express.json());


// routes;
app.use('/api/todos', todoRoutes);


// middlewares
app.use(notFound);
app.use(errorHandler);



export default app;