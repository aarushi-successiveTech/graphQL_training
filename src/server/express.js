import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import cors from "cors";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import { pubsub } from "../server/pubsub.js"; // Import the pubsub instance
import { typeDefs } from "../schema/typeDefs.js";
import { resolvers } from "../schema/resolvers.js";
import { connectDB } from "../config/connectDB.js";
import { authToken } from "../modules/user/middleware/authToken.js";
import { verify } from "crypto";

connectDB(); 
export async function createExpressServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Build executable schema
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Apollo Server setup
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();

  // Attach HTTP middleware
  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({req}) => {
        try{
            let token = req.headers.authorization || ""; 
            let user = null; 
            if(token.startsWith("Bearer")){
              token = token.slice(7); 
            }
            if(token){
              try{
                user = await authToken(token); 
              }
              catch(error){
                console.log(error); 
              }
            }
            return {user, pubsub}; 
        }
        catch(error){
            console.log('Auth Error', error); 
            throw new Error('Authentication Error');
        }
      },

    })
  );

  // WebSocket server for subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  useServer(
    {
      schema,
      context: async() => {
        return ({pubsub}) 
      }
    },
    wsServer
  );

  return httpServer;
}

export const createApolloServer = createExpressServer;