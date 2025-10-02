import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import incidentRoutes from './routes/incidents';
import lineasRoutes from './routes/lineas';
import feedbackRoutes from './routes/feedback';
import { errorHandler } from './middleware/error';
import { initStore } from './utils/db';

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => res.json({ ok: true, status: 'healthy' }));
app.use('/api/auth', authRoutes);
app.use('/api/incidentes', incidentRoutes);
app.use('/api/lineas', lineasRoutes);
app.use('/api/feedback', feedbackRoutes);

app.use(errorHandler);

const PORT = Number(process.env.PORT || 4000);
initStore().then(() => {
  app.listen(PORT, () => console.log(`[backend] http://localhost:${PORT}`));
});
