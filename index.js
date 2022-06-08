const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema.js");
const { Query } = require("./resolvers/Query");
const { Mutation } = require("./resolvers/Mutation");
const { Category } = require("./resolvers/Category");
const { Product } = require("./resolvers/Product");
const { db } = require("./db.js");

// const typeDefs = gql`
//   type Query {
//     hello: String
//     noOfAnimals: Int
//     fruits: [String]
//   }

// const resolvers = {
//   Query: {
//     hello: () => {
//       return "Hello World!";
//     },
//     noOfAnimals: () => {
//       return 10;
//     },
//     fruits: () => {
//       return ["Apple", "Banana"];
//     },
//   },
// };

const resolvers = {
  Query,
  Category,
  Product,
  Mutation,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    db,
  },
});

server.listen().then(({ url }) => {
  console.log("Server is running at " + url);
});
