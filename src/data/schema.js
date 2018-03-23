/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import log4js from 'log4js'
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
type Log {
  infoText: String
  debugText: String
  errorText: String
}

type Query {
  hello: String
}

type Mutation {
  log (
    infoText: String
    debugText: String
    errorText: String
  ): Log
}

schema {
  query: Query
  mutation: Mutation
}
`;

const resolvers = {
  Query: {
    hello: () => 'Hello',
  },
  Mutation: {
    log: (
      _,
      { infoText, debugText, errorText },
      context,
    ) => {
      const logger = log4js.getLogger();
      logger.addContext('requestId', '123');
      if (infoText) {
        logger.info(infoText);
      }
      if (debugText) {
        logger.debug(debugText);
      }
      if (errorText) {
        logger.error(errorText);
      }
    },
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
