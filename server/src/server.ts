import { ApolloServer } from 'apollo-server';
import { createContext } from './context';
import { schema } from './schema';

export const server = new ApolloServer({
  schema,
  context: createContext,
});

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log(`🚀 Server ready at: ${url} ⭐️ `));
