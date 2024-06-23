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
  }
`;

export default userTypeDef;
