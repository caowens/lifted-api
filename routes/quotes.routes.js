import { Router } from "express";
import { getRandomQuote, getQuoteById, createPrivateQuote, editPrivateQuote, deletePrivateQuote, getAllQuotes } from "../controllers/quotes.controller.js";
import { authorize, authOptional } from "../middlewares/auth.middleware.js";

const quoteRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Quotes
 *   description: Public and private quote management
*/

/**
 * @swagger
 * /api/v1/quotes:
 *   get:
 *     summary: Get all quotes (public, private, or all)
 *     tags: [Quotes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 20
 *       - in: query
 *         name: scope
 *         schema:
 *           type: string
 *           enum: [public, private, all]
 *           example: public
 *     responses:
 *       200:
 *         description: List of quotes with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     quotes:
 *                       type: array
 *                       items:
 *                         $ref: "#/components/schemas/Quote"
 *       401:
 *         description: Unauthorized when requesting private/all without authentication
*/
quoteRouter.get('/', authOptional, getAllQuotes);

/**
 * @swagger
 * /api/v1/quotes/random:
 *   get:
 *     summary: Get a random quote
 *     tags: [Quotes]
 *     parameters:
 *       - in: query
 *         name: scope
 *         schema:
 *           type: string
 *           enum: [public, private, all]
 *           example: public
 *     responses:
 *       200:
 *         description: Random quote fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: "#/components/schemas/Quote"
 *       401:
 *         description: Login required for private/all scopes
 *       400:
 *         description: Invalid scope parameter
*/
quoteRouter.get('/random', authOptional, getRandomQuote);

/**
 * @swagger
 * /api/v1/quotes/{id}:
 *   get:
 *     summary: Get a quote by its ID
 *     tags: [Quotes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "65a1d4cabc1234567890ef12"
 *     responses:
 *       200:
 *         description: Quote retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: "#/components/schemas/Quote"
 *       403:
 *         description: Unauthorized access to someone else's private quote
 *       404:
 *         description: Quote not found
*/
quoteRouter.get('/:id', authOptional, getQuoteById);

/**
 * @swagger
 * /api/v1/quotes:
 *   post:
 *     summary: Create a new private quote (requires login)
 *     tags: [Quotes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [text]
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Be yourself; everyone else is already taken."
 *               author:
 *                 type: string
 *                 example: "Oscar Wilde"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["life", "individuality"]
 *     responses:
 *       201:
 *         description: Quote created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: "#/components/schemas/Quote"
 *       401:
 *         description: Unauthorized (no token or invalid)
*/
quoteRouter.post('/', authorize, createPrivateQuote);

/**
 * @swagger
 * /api/v1/quotes/{id}:
 *   put:
 *     summary: Edit a private quote you own
 *     tags: [Quotes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         example: "65a1d4cabc1234567890ef12"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               author:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Quote edited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: "#/components/schemas/Quote"
 *       403:
 *         description: You do not own this quote
 *       404:
 *         description: Quote not found
*/
quoteRouter.put('/:id', authorize, editPrivateQuote);

/**
 * @swagger
 * /api/v1/quotes/{id}:
 *   delete:
 *     summary: Delete a private quote you own
 *     tags: [Quotes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Quote deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Quote deleted successfully
 *       403:
 *         description: You do not own this quote
 *       404:
 *         description: Quote not found
*/
quoteRouter.delete('/:id', authorize, deletePrivateQuote);

export default quoteRouter;