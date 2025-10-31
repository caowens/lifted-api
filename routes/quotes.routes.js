import { Router } from "express";
import { getRandomQuote } from "../controllers/quotes.controller.js";

const quoteRouter = Router();

quoteRouter.get('/random', getRandomQuote);

quoteRouter.get('/:id', (req, res) => res.send({title: `GET quote with ID`}));

export default quoteRouter;