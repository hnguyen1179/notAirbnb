import { gql } from 'apollo-server';

const LOG_IN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
      }
      token
    }
  }
`;

export { LOG_IN };
