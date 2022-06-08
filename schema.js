const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    products(filter: productsFilter): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
    reviews: [Review!]
  }

  type Mutation {
    addCategory(input: addCategoryInput): Category!
    addProduct(input: addProductInput): Product!

    deleteProduct(id: ID!): Boolean!
    updateCategory(id: ID!, input: updateCategoryInput): Category!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quanity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
    category: Category
    reviews: [Review!]
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
    product: Product
  }

  input productsFilter {
    onSale: Boolean
    avgRating: Float
  }

  input addCategoryInput {
    name: String!
  }

  input addProductInput {
    name: String!
    description: String!
    quanity: Int!
    price: Float!
    image: String
    onSale: Boolean!
    categoryId: String!
  }

  input updateCategoryInput {
    name: String!
  }
`;
