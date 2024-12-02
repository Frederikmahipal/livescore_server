import express from 'express';
import cors from 'cors';
import session from 'express-session';
import apiRoutes from './api/routes.js';
import articlesRoutes from './api/article_routes.js';
import userRoutes from './api/user_routes.js';
import connectDB from './db.js';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: 'json'};

dotenv.config();

const app = express();
const corsOptions = {
  origin: ['http://localhost:3000', 'https://livescore-client.vercel.app'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', apiRoutes);
app.use('/api', articlesRoutes);
app.use('/api', userRoutes);
connectDB();

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});