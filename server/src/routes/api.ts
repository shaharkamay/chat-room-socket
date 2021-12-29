import express from 'express';
// import auth from '../middleware/auth';

// import chatRouter from './chat';
import authRouter from './auth';

// import { eventsHandler } from '../controllers/eventsController';

const apiRoute = express.Router();

apiRoute.use('/auth', authRouter);
// apiRoute.use("/chat", auth, chatRouter);
// apiRoute.get("/events", auth, eventsHandler);

export default apiRoute;
