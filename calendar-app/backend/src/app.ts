import express from 'express';
import cors from 'cors';
import eventsRouter from './routes/events';
import authRouter from './routes/auth';
import { authenticateToken } from './middlewares/auth';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);

// Protect all /events routes
app.use('/events', authenticateToken, eventsRouter);

export default app;
