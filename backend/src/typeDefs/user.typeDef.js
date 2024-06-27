const userTypeDef = `#graphql
  type User {
    _id: ID!
    username: String!
    name: String!
    password: String!
    gender: String!
  }

  input SignUpInput {
    username: String!
    name: String!
    password: String!
    gender: String!
  }

  type SignUpResponse {
    user: User
    message: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type LoginResponse {
    user: User
    message: String!
  }

  type LogoutResponse {
    message: String!
  }

  type Query {
    user(userId: ID!): User
  }

  type Mutation {
    signUp(input: SignUpInput!): SignUpResponse
    login(input: LoginInput!): LoginResponse
    logout: LogoutResponse
  }
`;

export default userTypeDef;
