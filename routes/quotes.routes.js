import { Router } from "express";
import { getRandomQuote, getQuoteById, createPrivateQuote, editPrivateQuote, deletePrivateQuote } from "../controllers/quotes.controller.js";
import { authorize, authOptional } from "../middlewares/auth.middleware.js";

const quoteRouter = Router();

quoteRouter.get('/random', getRandomQuote);

quoteRouter.get('/:id', authOptional, getQuoteById);

quoteRouter.post('/', authorize, createPrivateQuote);

quoteRouter.put('/:id', authorize, editPrivateQuote);

quoteRouter.delete('/:id', authorize, deletePrivateQuote);

export default quoteRouter;