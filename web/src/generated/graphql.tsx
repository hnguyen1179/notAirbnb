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
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type BasicSearchResults = {
  count: Scalars['Int'];
  listings: Array<Maybe<Listing>>;
  offset: Scalars['Int'];
};

export type Host = {
  dateJoined: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  details: Array<Maybe<Scalars['String']>>;
  firstName: Scalars['String'];
  id: Scalars['String'];
  listings: Array<Maybe<Listing>>;
  medals: Array<Maybe<Scalars['String']>>;
};

export type Listing = {
  address: Scalars['String'];
  amenities: Array<Maybe<Scalars['String']>>;
  averageScore: Scalars['Float'];
  averageScores: ReviewScores;
  basicAmenities: Array<Maybe<Scalars['String']>>;
  city: Scalars['String'];
  cleaningFee: Scalars['Int'];
  datesUnavailable: Array<Maybe<Scalars['String']>>;
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
  createReservation?: Maybe<Reservation>;
  createReview?: Maybe<Review>;
  deleteReservation?: Maybe<Reservation>;
  deleteReview?: Maybe<Review>;
  login?: Maybe<AuthPayload>;
  signup?: Maybe<AuthPayload>;
  verifyEmail?: Maybe<Scalars['Boolean']>;
  verifyTripAuth?: Maybe<Scalars['Boolean']>;
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


export type MutationVerifyTripAuthArgs = {
  reservationId: Scalars['String'];
  userId: Scalars['String'];
};

export type Query = {
  allListings: Array<Listing>;
  basicSearch?: Maybe<BasicSearchResults>;
  hostById?: Maybe<Host>;
  listingById?: Maybe<Listing>;
  listingsByRegion: Array<Listing>;
  me?: Maybe<User>;
  reservationById?: Maybe<Reservation>;
  reservationsByUserId: Array<Array<Maybe<Reservation>>>;
  reviewsByHostId: Array<Review>;
  reviewsByListingId: Array<Review>;
  reviewsByUserId: Array<Review>;
  userById?: Maybe<User>;
};


export type QueryBasicSearchArgs = {
  checkIn?: Maybe<Scalars['String']>;
  checkOut?: Maybe<Scalars['String']>;
  entire?: Maybe<Scalars['Boolean']>;
  guests?: Maybe<Scalars['Int']>;
  languages?: Maybe<Array<Scalars['String']>>;
  listingType?: Maybe<Array<Scalars['String']>>;
  offset: Scalars['Int'];
  pets?: Maybe<Scalars['Boolean']>;
  privateListing?: Maybe<Scalars['Boolean']>;
  region?: Maybe<Scalars['String']>;
  smoking?: Maybe<Scalars['Boolean']>;
  superhost?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Array<Scalars['String']>>;
};


export type QueryHostByIdArgs = {
  id: Scalars['String'];
};


export type QueryListingByIdArgs = {
  id: Scalars['String'];
};


export type QueryListingsByRegionArgs = {
  region: Scalars['String'];
};


export type QueryReservationByIdArgs = {
  id: Scalars['String'];
};


export type QueryReservationsByUserIdArgs = {
  id: Scalars['String'];
};


export type QueryReviewsByHostIdArgs = {
  id: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryReviewsByListingIdArgs = {
  id: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryReviewsByUserIdArgs = {
  id: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryUserByIdArgs = {
  id: Scalars['String'];
};

export type Reservation = {
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

export type ReviewScores = {
  accuracy: Scalars['Float'];
  checkin: Scalars['Float'];
  cleanliness: Scalars['Float'];
  communication: Scalars['Float'];
  location: Scalars['Float'];
  value: Scalars['Float'];
};

export type User = {
  dateJoined: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  reservations: Array<Maybe<Reservation>>;
  reviews: Array<Maybe<Review>>;
  reviewsCount: Scalars['Int'];
};

export type CreateReservationMutationVariables = Exact<{
  data: ReservationCreateInput;
}>;


export type CreateReservationMutation = { createReservation?: Maybe<{ id: string, userId: string, listingId: string, dateStart: any, dateEnd: any, totalPrice: number }> };

export type DeleteReservationMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteReservationMutation = { deleteReservation?: Maybe<{ id: string }> };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { login?: Maybe<{ token?: Maybe<string>, user?: Maybe<{ id: string, firstName: string, lastName: string, email: string }> }> };

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = { signup?: Maybe<{ token?: Maybe<string> }> };

export type VerifyTripAuthMutationVariables = Exact<{
  userId: Scalars['String'];
  reservationId: Scalars['String'];
}>;


export type VerifyTripAuthMutation = { verifyTripAuth?: Maybe<boolean> };

export type BasicSearchQueryVariables = Exact<{
  region?: Maybe<Scalars['String']>;
  guests?: Maybe<Scalars['Int']>;
  checkIn?: Maybe<Scalars['String']>;
  checkOut?: Maybe<Scalars['String']>;
  offset: Scalars['Int'];
  tags?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  languages?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  listingType?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  superhost?: Maybe<Scalars['Boolean']>;
  pets?: Maybe<Scalars['Boolean']>;
  smoking?: Maybe<Scalars['Boolean']>;
  entire?: Maybe<Scalars['Boolean']>;
  privateListing?: Maybe<Scalars['Boolean']>;
}>;


export type BasicSearchQuery = { basicSearch?: Maybe<{ count: number, offset: number, listings: Array<Maybe<{ id: string, address: string, title: string, listingType: string, city: string, region: string, cleaningFee: number, price: number, superhost: boolean, averageScore: number, reviewsCount: number, basicAmenities: Array<Maybe<string>>, numGuests: number, numBedrooms: number, numBeds: number, numBaths: number, imageComments: Array<Maybe<string>> }>> }> };

export type HostByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type HostByIdQuery = { hostById?: Maybe<{ id: string, firstName: string, dateJoined: string, description?: Maybe<string>, medals: Array<Maybe<string>>, listings: Array<Maybe<{ id: string, title: string, reviewsCount: number, listingType: string, region: string, averageScore: number }>> }> };

export type ListingByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ListingByIdQuery = { listingById?: Maybe<{ id: string, address: string, city: string, state: string, title: string, listingType: string, region: string, cleaningFee: number, price: number, superhost: boolean, averageScore: number, reviewsCount: number, imageComments: Array<Maybe<string>>, amenities: Array<Maybe<string>>, languages: Array<Maybe<string>>, numGuests: number, numBedrooms: number, numBeds: number, numBaths: number, highlights: Array<Maybe<string>>, listingDescription?: Maybe<string>, locationDescription?: Maybe<string>, stayDescription?: Maybe<string>, datesUnavailable: Array<Maybe<string>>, houseRules: Array<Maybe<string>>, healthAndSafety: Array<Maybe<string>>, averageScores: { cleanliness: number, accuracy: number, communication: number, location: number, checkin: number, value: number }, host?: Maybe<{ id: string, firstName: string, medals: Array<Maybe<string>>, details: Array<Maybe<string>>, description?: Maybe<string>, dateJoined: string }> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me?: Maybe<{ id: string, firstName: string, lastName: string }> };

export type ReservationByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ReservationByIdQuery = { reservationById?: Maybe<{ id: string, listingId: string, dateStart: any, dateEnd: any, totalPrice: number, listing?: Maybe<{ city: string, title: string, region: string, address: string, price: number, cleaningFee: number, houseRules: Array<Maybe<string>>, imageComments: Array<Maybe<string>>, host?: Maybe<{ id: string, firstName: string }> }> }> };

export type ReservationsByUserIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ReservationsByUserIdQuery = { reservationsByUserId: Array<Array<Maybe<{ id: string, listingId: string, dateStart: any, dateEnd: any, listing?: Maybe<{ city: string, title: string, region: string }> }>>> };

export type ReviewsByHostIdQueryVariables = Exact<{
  id: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
}>;


export type ReviewsByHostIdQuery = { reviewsByHostId: Array<{ id: string, listingId: string, authorId: string, date: any, content: string, listing?: Maybe<{ id: string, title: string, region: string }>, author?: Maybe<{ firstName: string, dateJoined: string }> }> };

export type ReviewsByListingIdQueryVariables = Exact<{
  id: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
}>;


export type ReviewsByListingIdQuery = { reviewsByListingId: Array<{ id: string, date: any, content: string, listing?: Maybe<{ id: string, title: string, region: string }>, author?: Maybe<{ id: string, firstName: string, dateJoined: string }> }> };

export type ReviewsByUserIdQueryVariables = Exact<{
  id: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
}>;


export type ReviewsByUserIdQuery = { reviewsByUserId: Array<{ id: string, listingId: string, date: any, content: string, scores: Array<Maybe<string>>, listing?: Maybe<{ host?: Maybe<{ id: string, firstName: string, dateJoined: string }> }> }> };

export type UserByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserByIdQuery = { userById?: Maybe<{ id: string, firstName: string, lastName: string, email: string, dateJoined: string, reviewsCount: number }> };


export const CreateReservationDocument = gql`
    mutation createReservation($data: ReservationCreateInput!) {
  createReservation(data: $data) {
    id
    userId
    listingId
    dateStart
    dateEnd
    totalPrice
  }
}
    `;
export type CreateReservationMutationFn = Apollo.MutationFunction<CreateReservationMutation, CreateReservationMutationVariables>;

/**
 * __useCreateReservationMutation__
 *
 * To run a mutation, you first call `useCreateReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReservationMutation, { data, loading, error }] = useCreateReservationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateReservationMutation(baseOptions?: Apollo.MutationHookOptions<CreateReservationMutation, CreateReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReservationMutation, CreateReservationMutationVariables>(CreateReservationDocument, options);
      }
export type CreateReservationMutationHookResult = ReturnType<typeof useCreateReservationMutation>;
export type CreateReservationMutationResult = Apollo.MutationResult<CreateReservationMutation>;
export type CreateReservationMutationOptions = Apollo.BaseMutationOptions<CreateReservationMutation, CreateReservationMutationVariables>;
export const DeleteReservationDocument = gql`
    mutation deleteReservation($id: String!) {
  deleteReservation(id: $id) {
    id
  }
}
    `;
export type DeleteReservationMutationFn = Apollo.MutationFunction<DeleteReservationMutation, DeleteReservationMutationVariables>;

/**
 * __useDeleteReservationMutation__
 *
 * To run a mutation, you first call `useDeleteReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReservationMutation, { data, loading, error }] = useDeleteReservationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteReservationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReservationMutation, DeleteReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReservationMutation, DeleteReservationMutationVariables>(DeleteReservationDocument, options);
      }
export type DeleteReservationMutationHookResult = ReturnType<typeof useDeleteReservationMutation>;
export type DeleteReservationMutationResult = Apollo.MutationResult<DeleteReservationMutation>;
export type DeleteReservationMutationOptions = Apollo.BaseMutationOptions<DeleteReservationMutation, DeleteReservationMutationVariables>;
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
export const VerifyTripAuthDocument = gql`
    mutation verifyTripAuth($userId: String!, $reservationId: String!) {
  verifyTripAuth(userId: $userId, reservationId: $reservationId)
}
    `;
export type VerifyTripAuthMutationFn = Apollo.MutationFunction<VerifyTripAuthMutation, VerifyTripAuthMutationVariables>;

/**
 * __useVerifyTripAuthMutation__
 *
 * To run a mutation, you first call `useVerifyTripAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyTripAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyTripAuthMutation, { data, loading, error }] = useVerifyTripAuthMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      reservationId: // value for 'reservationId'
 *   },
 * });
 */
export function useVerifyTripAuthMutation(baseOptions?: Apollo.MutationHookOptions<VerifyTripAuthMutation, VerifyTripAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyTripAuthMutation, VerifyTripAuthMutationVariables>(VerifyTripAuthDocument, options);
      }
export type VerifyTripAuthMutationHookResult = ReturnType<typeof useVerifyTripAuthMutation>;
export type VerifyTripAuthMutationResult = Apollo.MutationResult<VerifyTripAuthMutation>;
export type VerifyTripAuthMutationOptions = Apollo.BaseMutationOptions<VerifyTripAuthMutation, VerifyTripAuthMutationVariables>;
export const BasicSearchDocument = gql`
    query basicSearch($region: String, $guests: Int, $checkIn: String, $checkOut: String, $offset: Int!, $tags: [String!], $languages: [String!], $listingType: [String!], $superhost: Boolean, $pets: Boolean, $smoking: Boolean, $entire: Boolean, $privateListing: Boolean) {
  basicSearch(
    region: $region
    guests: $guests
    checkIn: $checkIn
    checkOut: $checkOut
    offset: $offset
    tags: $tags
    languages: $languages
    listingType: $listingType
    superhost: $superhost
    pets: $pets
    smoking: $smoking
    entire: $entire
    privateListing: $privateListing
  ) {
    count
    listings {
      id
      address
      title
      listingType
      city
      region
      cleaningFee
      price
      superhost
      averageScore
      reviewsCount
      basicAmenities
      numGuests
      numBedrooms
      numBeds
      numBaths
      imageComments
    }
    offset
  }
}
    `;

/**
 * __useBasicSearchQuery__
 *
 * To run a query within a React component, call `useBasicSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useBasicSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBasicSearchQuery({
 *   variables: {
 *      region: // value for 'region'
 *      guests: // value for 'guests'
 *      checkIn: // value for 'checkIn'
 *      checkOut: // value for 'checkOut'
 *      offset: // value for 'offset'
 *      tags: // value for 'tags'
 *      languages: // value for 'languages'
 *      listingType: // value for 'listingType'
 *      superhost: // value for 'superhost'
 *      pets: // value for 'pets'
 *      smoking: // value for 'smoking'
 *      entire: // value for 'entire'
 *      privateListing: // value for 'privateListing'
 *   },
 * });
 */
export function useBasicSearchQuery(baseOptions: Apollo.QueryHookOptions<BasicSearchQuery, BasicSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BasicSearchQuery, BasicSearchQueryVariables>(BasicSearchDocument, options);
      }
export function useBasicSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BasicSearchQuery, BasicSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BasicSearchQuery, BasicSearchQueryVariables>(BasicSearchDocument, options);
        }
export type BasicSearchQueryHookResult = ReturnType<typeof useBasicSearchQuery>;
export type BasicSearchLazyQueryHookResult = ReturnType<typeof useBasicSearchLazyQuery>;
export type BasicSearchQueryResult = Apollo.QueryResult<BasicSearchQuery, BasicSearchQueryVariables>;
export const HostByIdDocument = gql`
    query hostById($id: String!) {
  hostById(id: $id) {
    id
    firstName
    dateJoined
    description
    medals
    listings {
      id
      title
      reviewsCount
      listingType
      region
      averageScore
    }
  }
}
    `;

/**
 * __useHostByIdQuery__
 *
 * To run a query within a React component, call `useHostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useHostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHostByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHostByIdQuery(baseOptions: Apollo.QueryHookOptions<HostByIdQuery, HostByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HostByIdQuery, HostByIdQueryVariables>(HostByIdDocument, options);
      }
export function useHostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HostByIdQuery, HostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HostByIdQuery, HostByIdQueryVariables>(HostByIdDocument, options);
        }
export type HostByIdQueryHookResult = ReturnType<typeof useHostByIdQuery>;
export type HostByIdLazyQueryHookResult = ReturnType<typeof useHostByIdLazyQuery>;
export type HostByIdQueryResult = Apollo.QueryResult<HostByIdQuery, HostByIdQueryVariables>;
export const ListingByIdDocument = gql`
    query listingById($id: String!) {
  listingById(id: $id) {
    id
    address
    city
    state
    title
    listingType
    region
    cleaningFee
    price
    superhost
    averageScore
    averageScores {
      cleanliness
      accuracy
      communication
      location
      checkin
      value
    }
    reviewsCount
    imageComments
    amenities
    languages
    numGuests
    numBedrooms
    numBeds
    numBaths
    highlights
    listingDescription
    locationDescription
    stayDescription
    datesUnavailable
    languages
    houseRules
    healthAndSafety
    host {
      id
      firstName
      medals
      details
      description
      dateJoined
    }
  }
}
    `;

/**
 * __useListingByIdQuery__
 *
 * To run a query within a React component, call `useListingByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useListingByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListingByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useListingByIdQuery(baseOptions: Apollo.QueryHookOptions<ListingByIdQuery, ListingByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListingByIdQuery, ListingByIdQueryVariables>(ListingByIdDocument, options);
      }
export function useListingByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListingByIdQuery, ListingByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListingByIdQuery, ListingByIdQueryVariables>(ListingByIdDocument, options);
        }
export type ListingByIdQueryHookResult = ReturnType<typeof useListingByIdQuery>;
export type ListingByIdLazyQueryHookResult = ReturnType<typeof useListingByIdLazyQuery>;
export type ListingByIdQueryResult = Apollo.QueryResult<ListingByIdQuery, ListingByIdQueryVariables>;
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
export const ReservationByIdDocument = gql`
    query reservationById($id: String!) {
  reservationById(id: $id) {
    id
    listingId
    dateStart
    dateEnd
    totalPrice
    listing {
      city
      title
      region
      address
      price
      cleaningFee
      houseRules
      imageComments
      host {
        id
        firstName
      }
    }
  }
}
    `;

/**
 * __useReservationByIdQuery__
 *
 * To run a query within a React component, call `useReservationByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useReservationByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReservationByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReservationByIdQuery(baseOptions: Apollo.QueryHookOptions<ReservationByIdQuery, ReservationByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReservationByIdQuery, ReservationByIdQueryVariables>(ReservationByIdDocument, options);
      }
export function useReservationByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReservationByIdQuery, ReservationByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReservationByIdQuery, ReservationByIdQueryVariables>(ReservationByIdDocument, options);
        }
export type ReservationByIdQueryHookResult = ReturnType<typeof useReservationByIdQuery>;
export type ReservationByIdLazyQueryHookResult = ReturnType<typeof useReservationByIdLazyQuery>;
export type ReservationByIdQueryResult = Apollo.QueryResult<ReservationByIdQuery, ReservationByIdQueryVariables>;
export const ReservationsByUserIdDocument = gql`
    query reservationsByUserId($id: String!) {
  reservationsByUserId(id: $id) {
    id
    listingId
    dateStart
    dateEnd
    listing {
      city
      title
      region
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
export const ReviewsByHostIdDocument = gql`
    query reviewsByHostId($id: String!, $offset: Int) {
  reviewsByHostId(id: $id, offset: $offset) {
    id
    listingId
    authorId
    date
    content
    listing {
      id
      title
      region
    }
    author {
      firstName
      dateJoined
    }
  }
}
    `;

/**
 * __useReviewsByHostIdQuery__
 *
 * To run a query within a React component, call `useReviewsByHostIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewsByHostIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewsByHostIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useReviewsByHostIdQuery(baseOptions: Apollo.QueryHookOptions<ReviewsByHostIdQuery, ReviewsByHostIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReviewsByHostIdQuery, ReviewsByHostIdQueryVariables>(ReviewsByHostIdDocument, options);
      }
export function useReviewsByHostIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReviewsByHostIdQuery, ReviewsByHostIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReviewsByHostIdQuery, ReviewsByHostIdQueryVariables>(ReviewsByHostIdDocument, options);
        }
export type ReviewsByHostIdQueryHookResult = ReturnType<typeof useReviewsByHostIdQuery>;
export type ReviewsByHostIdLazyQueryHookResult = ReturnType<typeof useReviewsByHostIdLazyQuery>;
export type ReviewsByHostIdQueryResult = Apollo.QueryResult<ReviewsByHostIdQuery, ReviewsByHostIdQueryVariables>;
export const ReviewsByListingIdDocument = gql`
    query reviewsByListingId($id: String!, $offset: Int) {
  reviewsByListingId(id: $id, offset: $offset) {
    id
    date
    content
    listing {
      id
      title
      region
    }
    author {
      id
      firstName
      dateJoined
    }
  }
}
    `;

/**
 * __useReviewsByListingIdQuery__
 *
 * To run a query within a React component, call `useReviewsByListingIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewsByListingIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewsByListingIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useReviewsByListingIdQuery(baseOptions: Apollo.QueryHookOptions<ReviewsByListingIdQuery, ReviewsByListingIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReviewsByListingIdQuery, ReviewsByListingIdQueryVariables>(ReviewsByListingIdDocument, options);
      }
export function useReviewsByListingIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReviewsByListingIdQuery, ReviewsByListingIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReviewsByListingIdQuery, ReviewsByListingIdQueryVariables>(ReviewsByListingIdDocument, options);
        }
export type ReviewsByListingIdQueryHookResult = ReturnType<typeof useReviewsByListingIdQuery>;
export type ReviewsByListingIdLazyQueryHookResult = ReturnType<typeof useReviewsByListingIdLazyQuery>;
export type ReviewsByListingIdQueryResult = Apollo.QueryResult<ReviewsByListingIdQuery, ReviewsByListingIdQueryVariables>;
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