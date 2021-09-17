import { gql } from 'apollo-server';

const ALL_LISTINGS = gql`
  query listings {
    allListings {
      id
      title
    }
  }
`;

const LISTING_BY_REGION = gql`
  query listings($region: String!) {
    listingsByRegion(region: $region) {
      title
    }
  }
`;

const LISTING_BY_ID = gql`
  query listing($id: String!) {
    listingById(id: $id) {
      title
      host {
        id
        firstName
      }
    }
  }
`;

const USER_BY_ID = gql`
  query user($id: String!) {
    userById(id: $id) {
      id
      reviews {
        author {
          id
        }
      }
      reservations {
        user {
          id
        }
      }
    }
  }
`;

export { ALL_LISTINGS, LISTING_BY_REGION, LISTING_BY_ID, USER_BY_ID };
