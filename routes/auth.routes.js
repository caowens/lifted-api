import { Router } from "express";

import { signUp, signIn, signOut } from "../controllers/auth.controller.js";

const authRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication routes
*/

/**
 * @swagger
 * /api/v1/auth/sign-up:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: your-jwt-token-here
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       409:
 *         description: User already exists
 *       500:
 *         description: Server error
*/
authRouter.post("/sign-up", signUp);

/**
 * @swagger
 * /api/v1/auth/sign-in:
 *   post:
 *     summary: Sign in an existing user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *     responses:
 *       200:
 *         description: User signed in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User signed in successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: your-jwt-token-here
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid password
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
*/
authRouter.post("/sign-in", signIn);

export default authRouter;