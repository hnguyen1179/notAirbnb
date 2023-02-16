import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { schema } from './schema';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const server = new ApolloServer({
  schema,
});

(async () => {
  const port = process.env.PORT;
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ ...req, prisma }),
    listen: { port: port ? Number(port) : 4000 },
  });

  console.log(`🚀 Server ready at: ${url} ⭐️ `);
})();
