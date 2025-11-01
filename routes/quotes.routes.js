import { Router } from "express";
import { getRandomQuote, getQuoteById, createPrivateQuote } from "../controllers/quotes.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const quoteRouter = Router();

quoteRouter.get('/random', getRandomQuote);

quoteRouter.get('/:id', getQuoteById);

quoteRouter.post('/', authorize, createPrivateQuote);

export default quoteRouter;