import { gql } from "@apollo/client";

const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      transaction {
        _id
        description
        paymentType
        category
        amount
        location
        date
      }
      message
    }
  }
`;

const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($input: UpdateTransactionInput!) {
    updateTransaction(input: $input) {
      _id
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;

const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($transactionId: ID!) {
    deleteTransaction(transactionId: $transactionId) {
      transaction {
        _id
        description
        paymentType
        category
        amount
        location
        date
      }
      message
    }
  }
`;

export { CREATE_TRANSACTION, DELETE_TRANSACTION, UPDATE_TRANSACTION };
