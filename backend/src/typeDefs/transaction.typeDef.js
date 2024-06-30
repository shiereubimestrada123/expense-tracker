const transactionTypeDef = `#graphql
  type Transaction {
    _id: ID!
    userId: ID!
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    location: String
    date: String!
    user: User!
  }

  input CreateTransactionInput {
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    date: String!
    location: String
  }

  type CreateResponse {
    transaction: Transaction
    message: String!
  }

  input UpdateTransactionInput {
    transactionId: ID!
    description: String
    paymentType: String
    category: String
    amount: Float
    location: String
    date: String
  }

  type DeleteResponse {
    transaction: Transaction
    message: String!
  }

  type Query {
    transactions: [Transaction!]
    transaction(transactionId: ID!): Transaction
  }

  type Mutation {
    createTransaction(input: CreateTransactionInput!): CreateResponse!
    updateTransaction(input: UpdateTransactionInput!): Transaction!
    deleteTransaction(transactionId:ID!): DeleteResponse!
  }
`;

export default transactionTypeDef;
