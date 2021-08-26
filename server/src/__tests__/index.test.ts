import { server as testServer } from '../testServer';
import {
  ALL_LISTINGS,
  LISTING_BY_REGION,
  LISTING_BY_ID,
  USER_BY_ID,
} from '../queries/queries';
import { LOG_IN, ME } from '../queries/mutations';

const SAMPLE_LISTING_ID = '25495492cbe79d1e18044e281be88056114cc003';
const SAMPLE_HOST_ID = '1c4029bb1b54d73e3465db1c319f59ff5ae0fcce';
const SAMPLE_USER_ID = '3551df33bba73ba35fe57f180ed47ea42dedf9a6';
const NUM_LISTINGS = 73;

afterAll(async () => {
  await testServer.stop();
});

// // Testing Queries
// test('allListings should correctly return all of the listings', async () => {
//   const result = await testServer.executeOperation({
//     query: ALL_LISTINGS,
//   });
//   console.log('RESOLULT: ', result);
//   const listingTitles = result.data?.allListings.map((x: any) => x.title);
//   expect(listingTitles.length).toBe(NUM_LISTINGS);
// });

// test('listingsByRegion should correctly return all of the listings from specified region', async () => {
//   const result = await testServer.executeOperation({
//     query: LISTING_BY_REGION,
//     variables: {
//       region: 'Los Angeles',
//     },
//   });

//   const listings = result.data?.listingsByRegion;

//   expect(listings.length).toBe(15);
// });

// // Testing listing -> host connection
// test('listingById should return the correct listing and host by id', async () => {
//   const result = await testServer.executeOperation({
//     query: LISTING_BY_ID,
//     variables: {
//       id: SAMPLE_LISTING_ID,
//     },
//   });

//   const { title, host } = result.data?.listingById;

//   expect(title).toBe('Bedroom in Linda Vista');
//   expect(host.firstName).toBe('Jeff');
//   expect(host.id).toBe(SAMPLE_HOST_ID);
// });

// test('userById should return the correct user, reviews, and reservations', async () => {
//   const result = await testServer.executeOperation({
//     query: USER_BY_ID,
//     variables: {
//       id: SAMPLE_USER_ID,
//     },
//   });

//   const { id, reviews, reservations } = result.data?.userById;

//   expect(id).toBe(SAMPLE_USER_ID);
//   expect(reviews[0].author.id).toBe(SAMPLE_USER_ID);
//   expect(reservations[0].user.id).toBe(SAMPLE_USER_ID);
// });

// TESTING MUTATIONS
test('logIn should authenticate the user correctly and return a token and user', async () => {
  const correctCredentials = {
    email: 'demo@demo.com',
    password: '1password',
  };

  const incorrectCredentials = {
    email: 'demo@demo.com',
    password: 'hotdog',
  };

  // Correct credentials inputted
  const result1 = await testServer.executeOperation({
    query: LOG_IN,
    variables: correctCredentials,
  });

  const { user, token } = result1.data?.login;
  expect(user.email).toBe('demo@demo.com');
  expect(token).toBeTruthy();

  // Incorrect credentials inputted
  const result2 = await testServer.executeOperation({
    query: LOG_IN,
    variables: incorrectCredentials,
  });

  const { errors } = result2;
  if (errors) {
    expect(errors[0].message).toBe('Invalid password');
  }
});
