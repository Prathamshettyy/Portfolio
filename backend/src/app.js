import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/projects.js';
import certificationRoutes from './routes/certifications.js';
import chatRoutes from './routes/chat.js';
import portfolioRoutes from './routes/portfolio.js';
import AppError from './utils/appError.js';
import globalErrorHandler from './middleware/errorMiddleware.js';

const app = express();


const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
const allowedOrigins = [
  corsOrigin, 
  'http://localhost:3000', 
  'https://protfolio-venu.vercel.app',
  'https://venugopala08.vercel.app' 
];

app.use(
  cors({
    origin: (origin, callback) => {

      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin) || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
        callback(null, true);
      } else {

        console.log('Blocked CORS origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);


app.use(express.json({ limit: '10kb' }));


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Handle 404 - Not Found
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

export default app;
