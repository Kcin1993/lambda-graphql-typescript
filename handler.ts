import { ApolloServer, gql } from "apollo-server-lambda";

const typeDefs = gql`
  type Query {
    test: String
  }
`;

const resolvers = {
  Query: {
    test: () => "Hey man. You can make it!"
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: receivedContext => ({
    ...receivedContext
  })
});

// Playground workaround
exports.graphqlHandler = (event: any, lambdaContext: any, callback: any) => {
  if (event.httpMethod === "GET") {
    server.createHandler()(
      {
        ...event,
        path: event.requestContext.path || event.path
      },
      lambdaContext,
      callback
    );
  } else {
    server.createHandler()(event, lambdaContext, callback);
  }
};
