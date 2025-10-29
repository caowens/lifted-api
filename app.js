import express from 'express';
import { PORT } from './config/env.js';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import quoteRouter from './routes/quotes.routes.js';

import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(express.json()); // allows app to handle json data sent in API calls
app.use(express.urlencoded({ extended: false })); // helps process html form data in a simple format
app.use(cookieParser()); // to parse cookies from requests

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/quotes', quoteRouter);

app.use(errorMiddleware); // Error handling middleware

app.get('/', (req, res) => {
  res.send('Welcome to the Lifted API!');
});


app.listen(PORT, async () => {
    console.log(`Lifted API is running on http://localhost:${PORT}`);
    await connectToDatabase();
});

export default app;