import { Router } from "express";
import { getRandomQuote, getQuoteById } from "../controllers/quotes.controller.js";

const quoteRouter = Router();

quoteRouter.get('/random', getRandomQuote);

quoteRouter.get('/:id', getQuoteById);

export default quoteRouter;