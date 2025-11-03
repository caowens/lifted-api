import swaggerJSDoc from "swagger-jsdoc";
import { PORT } from "./env.js";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "Lifted API",
      version: "1.0.0",
      description: "API documentation for the Lifted API",
    },
    servers: [
      {
        url: `http://localhost:${PORT}/`,
        description: "Local Dev Server",
      },
      {
        url: `https://lifted-api.onrender.com/`,
        description: "Production Server",
      }
    ],
    components: {
        schemas: {
            Quote: {
                type: "object",
                properties: {
                    _id: { type: "string", example: "65b91a3e5f4c2a1d5c773abc" },
                    text: { type: "string", example: "The future depends on what you do today." },
                    author: { type: "string", example: "Mahatma Gandhi" },
                    tags: { type: "array", items: { type: "string" }, example: ["inspirational"] },
                    userId: {
                        type: "string",
                        nullable: true,
                        description: "If null → public quote. Otherwise user-owned.",
                        example: "65b91a5e5f4c2a1d5c774def"
                    }
                }
            },
            User: {
                type: "object",
                properties: {
                    _id: { type: "string", example: "65b91a5e5f4c2a1d5c774def" },
                    name: { type: "string", example: "John Doe" },
                    email: { type: "string", example: "johndoe@example.com" },
                    createdAt: { type: "string", format: "date-time", example: "2024-06-15T12:34:56.789Z" },
                    updatedAt: { type: "string", format: "date-time", example: "2024-06-20T08:21:45.123Z" }
                }
            }
        },
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: "Enter your token in the format: Bearer <JWT>"
          },
        },
      },
      security: [{
        bearerAuth: [],
      }],
};

const options = {
  definition: swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;