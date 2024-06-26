const userTypeDef = `#graphql
  type User {
    _id: ID!
    username: String!
    name: String!
    password: String!
    gender: String!
  }

  type SignUpResponse {
    user: User
    message: String!
  }

  type LogoutResponse {
    message: String!
  }

  input SignUpInput {
    username: String!
    name: String!
    password: String!
    gender: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type Query {
    user(userId: ID!): User
  }

  type Mutation {
    signUp(input: SignUpInput!): SignUpResponse
    login(input: LoginInput!): User
    logout: LogoutResponse
  }
`;

export default userTypeDef;
