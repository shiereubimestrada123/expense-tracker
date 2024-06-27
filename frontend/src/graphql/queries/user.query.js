import { gql } from "@apollo/client";

const GET_AUTHENTICATED_USER = gql`
  query GetAuthenticatedUser {
    authUser {
      _id
      username
      name
      gender
    }
  }
`;

export { GET_AUTHENTICATED_USER };
