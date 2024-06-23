const userTypeDef = `#graphql
  type User {
    _id: ID!
    username: String!
    name: String!
    password: String!
    gender: String!
  }

  type Query {
    users: [User!]
    user(userId:ID!): User
  }
`;

export default userTypeDef;
