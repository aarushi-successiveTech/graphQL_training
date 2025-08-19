// index.js
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { typeDefs } from "./src/schema/typeDefs.js";
import { resolvers } from "./src/schema/resolvers.js";
import { connectDB } from "./src/config/connectDB.js";
import { authToken } from "./src/modules/user/middleware/authToken.js";

connectDB(); 

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
  context: async({req}) =>{
    try{
      const {user} = await authToken(req); 
      return {user}; 
    }
    catch(error){
      console.log(error); 
      throw new Error('user not available'); 
    }
  }
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);