import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import fs from 'fs';
import resolvers  from './src/resolvers/resolver.js';
const typeDefs = gql(fs.readFileSync('./src/schema/schema.graphql', {encoding: 'utf8'}));

const port = 4000;
const path = '/graphql'

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers
})

// dotenv.config()
server.applyMiddleware({ app, path });
app.listen(port, () => console.info(`Server started on port ${port}`));
