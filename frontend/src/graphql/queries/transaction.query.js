import { gql } from "@apollo/client";

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
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

export { GET_TRANSACTIONS };
