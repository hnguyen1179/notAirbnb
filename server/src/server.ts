import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { schema } from './schema';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// Required logic for integrating with Express
const app = express();

// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

export const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

(async () => {
  // Ensure we wait for our server to start
  await server.start();

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    '/',
    cors<cors.CorsRequest>({
      origin: ['https://not-airbnb.netlify.app'],
      credentials: true,
    }),
    bodyParser.json({ limit: '50mb' }),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({ req }) => ({ ...req, prisma }),
    }),
  );

  const port = process.env.PORT;
  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: port ? Number(port) : 4000 }, resolve),
  );

  console.log(`🚀 Server ready at http://localhost:${port || 4000}/`);
})();
