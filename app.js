import express from 'express';
import { PORT } from './config/env.js';

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import quoteRouter from './routes/quotes.routes.js';

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/quotes', quoteRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Lifted API!');
});


app.listen(PORT, () => {
    console.log(`Lifted API is running on http://localhost:${PORT}`);
});

export default app;