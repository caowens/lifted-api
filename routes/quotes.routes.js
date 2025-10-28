import { Router } from "express";

const quoteRouter = Router();

quoteRouter.get('/random', (req, res) => res.send({title: 'GET random quote'}));

quoteRouter.get('/:id', (req, res) => res.send({title: `GET quote with ID`}));

export default quoteRouter;