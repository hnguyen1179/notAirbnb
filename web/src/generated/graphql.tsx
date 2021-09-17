import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Host = {
  __typename?: 'Host';
  dateJoined: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  details: Array<Maybe<Scalars['String']>>;
  firstName: Scalars['String'];
  id: Scalars['String'];
  listings: Array<Maybe<Listing>>;
  medals: Array<Maybe<Scalars['String']>>;
};

export type Listing = {
  __typename?: 'Listing';
  address: Scalars['String'];
  amenities: Array<Maybe<Scalars['String']>>;
  basicAmenities: Array<Maybe<Scalars['String']>>;
  city: Scalars['String'];
  cleaningFee: Scalars['Int'];
  datesUnavailable: Scalars['JSONObject'];
  healthAndSafety: Array<Maybe<Scalars['String']>>;
  highlights: Array<Maybe<Scalars['String']>>;
  host?: Maybe<Host>;
  hostId: Scalars['String'];
  houseRules: Array<Maybe<Scalars['String']>>;
  id: Scalars['String'];
  imageComments: Array<Maybe<Scalars['String']>>;
  languages: Array<Maybe<Scalars['String']>>;
  listingDescription?: Maybe<Scalars['String']>;
  listingType: Scalars['String'];
  location: Scalars['String'];
  locationDescription?: Maybe<Scalars['String']>;
  numBaths: Scalars['Int'];
  numBedrooms: Scalars['Int'];
  numBeds: Scalars['Int'];
  numGuests: Scalars['Int'];
  petsRule: Scalars['Boolean'];
  price: Scalars['Int'];
  region: Scalars['String'];
  reservations: Array<Maybe<Reservation>>;
  reviews: Array<Maybe<Review>>;
  reviewsCount: Scalars['Int'];
  score: Scalars['Float'];
  scores: Array<Maybe<Scalars['String']>>;
  smokingRule: Scalars['Boolean'];
  state: Scalars['String'];
  stayDescription?: Maybe<Scalars['String']>;
  street: Scalars['String'];
  superhost: Scalars['Boolean'];
  title: Scalars['String'];
  zipCode: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createReservation?: Maybe<Reservation>;
  createReview?: Maybe<Review>;
  deleteReservation?: Maybe<Reservation>;
  deleteReview?: Maybe<Review>;
  login?: Maybe<AuthPayload>;
  signup?: Maybe<AuthPayload>;
  verifyEmail?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateReservationArgs = {
  data: ReservationCreateInput;
};


export type MutationCreateReviewArgs = {
  data: ReviewCreateInput;
};


export type MutationDeleteReservationArgs = {
  id: Scalars['String'];
};


export type MutationDeleteReviewArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};


export type MutationVerifyEmailArgs = {
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allListings: Array<Listing>;
  listingById?: Maybe<Listing>;
  listingsByRegion: Array<Listing>;
  me?: Maybe<User>;
  reservationsByUserId: Array<Array<Maybe<Reservation>>>;
  reviewsByUserId: Array<Review>;
  userById?: Maybe<User>;
};


export type QueryListingByIdArgs = {
  id: Scalars['String'];
};


export type QueryListingsByRegionArgs = {
  region: Scalars['String'];
};


export type QueryReservationsByUserIdArgs = {
  id: Scalars['String'];
};


export type QueryReviewsByUserIdArgs = {
  id: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryUserByIdArgs = {
  id: Scalars['String'];
};

export type Reservation = {
  __typename?: 'Reservation';
  dateEnd: Scalars['DateTime'];
  dateStart: Scalars['DateTime'];
  id: Scalars['String'];
  listing?: Maybe<Listing>;
  listingId: Scalars['String'];
  totalPrice: Scalars['Float'];
  user?: Maybe<User>;
  userId: Scalars['String'];
};

export type ReservationCreateInput = {
  dateEnd: Scalars['DateTime'];
  dateStart: Scalars['DateTime'];
  listingId: Scalars['String'];
  totalPrice: Scalars['Int'];
};

export type Review = {
  __typename?: 'Review';
  author?: Maybe<User>;
  authorId: Scalars['String'];
  content: Scalars['String'];
  date: Scalars['DateTime'];
  id: Scalars['String'];
  listing?: Maybe<Listing>;
  listingId: Scalars['String'];
  scores: Array<Maybe<Scalars['String']>>;
};

export type ReviewCreateInput = {
  authorId: Scalars['String'];
  content: Scalars['String'];
  listingId: Scalars['String'];
  scores: Array<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  dateJoined: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  reservations: Array<Maybe<Reservation>>;
  reviews: Array<Maybe<Review>>;
  reviewsCount: Scalars['Int'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: Maybe<{ __typename?: 'AuthPayload', token?: Maybe<string>, user?: Maybe<{ __typename?: 'User', id: string, firstName: string, lastName: string, email: string }> }> };

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup?: Maybe<{ __typename?: 'AuthPayload', token?: Maybe<string> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, firstName: string, lastName: string }> };

export type ReservationsByUserIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ReservationsByUserIdQuery = { __typename?: 'Query', reservationsByUserId: Array<Array<Maybe<{ __typename?: 'Reservation', id: string, listingId: string, dateStart: any, dateEnd: any, totalPrice: number, listing?: Maybe<{ __typename?: 'Listing', city: string, title: string, region: string, cleaningFee: number, price: number }> }>>> };

export type ReviewsByUserIdQueryVariables = Exact<{
  id: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
}>;


export type ReviewsByUserIdQuery = { __typename?: 'Query', reviewsByUserId: Array<{ __typename?: 'Review', id: string, listingId: string, date: any, content: string, scores: Array<Maybe<string>>, listing?: Maybe<{ __typename?: 'Listing', host?: Maybe<{ __typename?: 'Host', id: string, firstName: string, dateJoined: string, listings: Array<Maybe<{ __typename?: 'Listing', city: string }>> }> }> }> };

export type UserByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserByIdQuery = { __typename?: 'Query', userById?: Maybe<{ __typename?: 'User', id: string, firstName: string, lastName: string, email: string, dateJoined: string, reviewsCount: number }> };


export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      id
      firstName
      lastName
      email
    }
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignupDocument = gql`
    mutation signup($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
  signup(
    email: $email
    firstName: $firstName
    lastName: $lastName
    password: $password
  ) {
    token
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    firstName
    lastName
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ReservationsByUserIdDocument = gql`
    query reservationsByUserId($id: String!) {
  reservationsByUserId(id: $id) {
    id
    listingId
    dateStart
    dateEnd
    totalPrice
    listing {
      city
      title
      region
      cleaningFee
      price
    }
  }
}
    `;

/**
 * __useReservationsByUserIdQuery__
 *
 * To run a query within a React component, call `useReservationsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useReservationsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReservationsByUserIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReservationsByUserIdQuery(baseOptions: Apollo.QueryHookOptions<ReservationsByUserIdQuery, ReservationsByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReservationsByUserIdQuery, ReservationsByUserIdQueryVariables>(ReservationsByUserIdDocument, options);
      }
export function useReservationsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReservationsByUserIdQuery, ReservationsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReservationsByUserIdQuery, ReservationsByUserIdQueryVariables>(ReservationsByUserIdDocument, options);
        }
export type ReservationsByUserIdQueryHookResult = ReturnType<typeof useReservationsByUserIdQuery>;
export type ReservationsByUserIdLazyQueryHookResult = ReturnType<typeof useReservationsByUserIdLazyQuery>;
export type ReservationsByUserIdQueryResult = Apollo.QueryResult<ReservationsByUserIdQuery, ReservationsByUserIdQueryVariables>;
export const ReviewsByUserIdDocument = gql`
    query reviewsByUserId($id: String!, $offset: Int) {
  reviewsByUserId(id: $id, offset: $offset) {
    id
    listingId
    date
    content
    scores
    listing {
      host {
        id
        firstName
        dateJoined
        listings {
          city
        }
      }
    }
  }
}
    `;

/**
 * __useReviewsByUserIdQuery__
 *
 * To run a query within a React component, call `useReviewsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewsByUserIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useReviewsByUserIdQuery(baseOptions: Apollo.QueryHookOptions<ReviewsByUserIdQuery, ReviewsByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReviewsByUserIdQuery, ReviewsByUserIdQueryVariables>(ReviewsByUserIdDocument, options);
      }
export function useReviewsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReviewsByUserIdQuery, ReviewsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReviewsByUserIdQuery, ReviewsByUserIdQueryVariables>(ReviewsByUserIdDocument, options);
        }
export type ReviewsByUserIdQueryHookResult = ReturnType<typeof useReviewsByUserIdQuery>;
export type ReviewsByUserIdLazyQueryHookResult = ReturnType<typeof useReviewsByUserIdLazyQuery>;
export type ReviewsByUserIdQueryResult = Apollo.QueryResult<ReviewsByUserIdQuery, ReviewsByUserIdQueryVariables>;
export const UserByIdDocument = gql`
    query userById($id: String!) {
  userById(id: $id) {
    id
    firstName
    lastName
    email
    dateJoined
    reviewsCount
  }
}
    `;

/**
 * __useUserByIdQuery__
 *
 * To run a query within a React component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserByIdQuery(baseOptions: Apollo.QueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
      }
export function useUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
        }
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<typeof useUserByIdLazyQuery>;
export type UserByIdQueryResult = Apollo.QueryResult<UserByIdQuery, UserByIdQueryVariables>;