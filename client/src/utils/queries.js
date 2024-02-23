import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      cards {
        _id
        front
        back
        
      }
    }
  }
`;

export const QUERY_CARDS = gql`
  query getThoughts {
    cards {
      _id
      front
      back
     
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    card(thoughtId: $thoughtId) {
      _id
      front
      back
      
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      cards {
        _id
        front
        back
     
      }
    }
  }
`;
