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

  type Mutation {
    signUp(input: SignUpInput!): User
  }

  input SignUpInput {
    username: String!
    name: String!
    password: String!
    gender: String!
  }
`;

export default userTypeDef;
