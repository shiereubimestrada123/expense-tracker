import { gql } from "@apollo/client";

const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      user {
        _id
        username
        name
        password
        gender
      }
      message
    }
  }
`;

export { SIGN_UP };
