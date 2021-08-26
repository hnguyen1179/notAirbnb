import users from './user_and_reviews_reservations.json';
import hosts from './host_and_listings.json';
import proper_dates_unavailable from './proper_dates_unavailable.json';
import { PrismaClient, Prisma } from '@prisma/client';

// const prisma = new PrismaClient();

// const userData = users.map((user) => {
//   const userObj: Prisma.UserCreateInput = {
//     id: user.id,
//     firstName: user.firstName,
//     lastName: user.lastName,
//     email: user.email,
//     password: user.password,
//     dateJoined: user.dateJoined,
//   };

//   return userObj;
// });

// const hostData = hosts.map((host) => {
//   const hostObj: Prisma.HostCreateInput = {
//     id: host.id,
//     firstName: host.firstName,
//     dateJoined: host.dateJoined,
//     description: host.description,
//     details: host.details,
//     medals: host.medals,
//   };

//   return hostObj;
// });

// const userData: Prisma.UserCreateInput[] = [
//   {
//     firstName: 'David',
//     lastName: 'Deaton',
//     email: 'daviddeaton@gmail.com',
//     password: '$2a$10$TLtC603wy85MM./ot/pvEec0w2au6sjPaOmLpLQFbxPdpJH9fDwwS', // myPassword42
//     reservations: {
//       create: [
//         {
//           listingId: 1,
//           dateStart: new Date('July 4, 2021'),
//           dateEnd: new Date('July 8, 2021'),
//           totalPrice: 420,
//         },
//       ],
//     },
//     reviews: {
//       create: [
//         {
//           listingId: 1,
//           accuracyScore: 4,
//           checkInScore: 5,
//           cleanScore: 5,
//           communicationScore: 4,
//           locationScore: 5,
//           valueScore: 4,
//           content: 'This place was great!',
//         },
//       ],
//     },
//   },
// ];

// const hostData: Prisma.HostCreateInput[] = [
//   {
//     firstName: 'Jack',
//     lastName: 'Doe',
//     dateJoined: new Date(),
//     description: 'I like airbnb',
//     languages: ['English'],
//     responseRate: 100,
//     responseTime: 'within an hour',
//     superHost: true,
//     enhancedClean: true,
//     listings: {
//       create: [
//         {
//           title: 'Nice place',
//           street: '123 Fake St',
//           city: 'Faketown',
//           houseDescription: 'Very nice',
//           zipCode: 55555,
//           price: 420,
//           numGuests: 5,
//           numBedrooms: 3,
//           numBeds: 4,
//           numBaths: 3,
//           listingType: 'Entire House',
//           amenities: ['Hot tub'],
//           checkIn: 16,
//           checkOut: 10,
//           selfCheckIn: true,
//           ruleDescription: 'No more parties in Faketown',
//           smokingRule: false,
//           partiesRule: false,
//           petsRule: false,
//         },
//       ],
//     },
//   },
// ];

// const listingData: Prisma.ListingCreateInput[] = [
//   {

//   }
// ];

// const reviewData: Prisma.ReviewCreateInput[] = [
//   {

//   }
// ]

// const userData: Prisma.UserCreateInput[] = [
//   {
//     name: 'Alice',
//     email: 'alice@prisma.io',
//     password: '$2a$10$TLtC603wy85MM./ot/pvEec0w2au6sjPaOmLpLQFbxPdpJH9fDwwS', // myPassword42
//     posts: {
//       create: [
//         {
//           title: 'Join the Prisma Slack',
//           content: 'https://slack.prisma.io',
//           published: true,
//         },
//       ],
//     },
//   },
//   {
//     name: 'Nilu',
//     email: 'nilu@prisma.io',
//     password: '$2a$10$k2rXCFgdmO84Vhkyb6trJ.oH6MYLf141uTPf81w04BImKVqDbBivi', // random42
//     posts: {
//       create: [
//         {
//           title: 'Follow Prisma on Twitter',
//           content: 'https://www.twitter.com/prisma',
//           published: true,
//           viewCount: 42,
//         },
//       ],
//     },
//   },
//   {
//     firstName: 'Mahmoud',
//     email: 'mahmoud@prisma.io',
//     password: '$2a$10$lTlNdIBQvCho0BoQg21KWu/VVKwlYsGwAa5r7ctOV41EKXRQ31ING', // iLikeTurtles42
//     posts: {
//       create: [
//         {
//           title: 'Ask a question about Prisma on GitHub',
//           content: 'https://www.github.com/prisma/prisma/discussions',
//           published: true,
//           viewCount: 128,
//         },
//         {
//           title: 'Prisma on YouTube',
//           content: 'https://pris.ly/youtube',
//         },
//       ],
//     },
//   },
// ];
// console.log(users[0]);

// async function main() {
//   console.log(`Start seeding ...`);
// for (const u of userData) {
//   const user = await prisma.user.create({
//     data: u,
//   });
//   console.log(`Created user with id: ${user.id}`);
// }

// for (const h of hostData) {
//   const host = await prisma.host.create({
//     data: h,
//   });
//   console.log(`Created host with id: ${host.id}`);
// }

//seeding listings
// for (const host of hosts) {
//   const listings = host.listings;
//   for (const listing of listings) {
//     const item = await prisma.listing.create({
//       data: {
//         id: listing.id,
//         hostId: listing.hostId,
//         title: listing.title,
//         street: listing.street,
//         city: listing.city,
//         state: listing.state,
//         zipCode: listing.zipcode,
//         address: listing.address,
//         location: listing.location,
//         region: listing.region,
//         listingDescription: listing.listingDescription,
//         locationDescription: listing.locationDescription,
//         stayDescription: listing.stayDescription,
//         price: listing.price,
//         cleaningFee: listing.cleaningFee,
//         numGuests: listing.numGuests,
//         numBedrooms: listing.numBedrooms,
//         numBeds: listing.numBeds,
//         numBaths: listing.numBaths,
//         smokingRule: listing.smokingRule,
//         petsRule: listing.petsRule,
//         superhost: listing.superhost,
//         languages: listing.languages,
//         imageComments: listing.imageComments,
//         listingType: listing.listingType,
//         basicAmenities: listing.basicAmenities,
//         amenities: listing.amenities,
//         houseRules: listing.houseRules,
//         healthAndSafety: listing.healthAndSafety,
//         highlights: listing.highlights,
//         score: listing.score,
//         scores: listing.scoreBreakdown,
//         datesUnavailable: listing.datesUnavailable,
//       },
//     });
//     console.log(`Created listing with id: ${item.id}`);
//   }
// }

// Seeding Reviews
// for (const user of users) {
//   const reviews = user.reviews;
//   for (const review of reviews) {
//     const { listingId, date, content, authorId, scores } = review;

//     const item = await prisma.review.create({
//       data: {
//         listingId,
//         authorId,
//         date,
//         content,
//         scores,
//       },
//     });

//     console.log(`Created review with id: ${item.id}`);
//   }
// }

// Seeding reservations
//   for (const user of users) {
//     const reservations = user.reservations;
//     for (const reservation of reservations) {
//       const { listingId, userId, dateStart, dateEnd, totalPrice } = reservation;

//       const item = await prisma.reservation.create({
//         data: {
//           listingId,
//           userId,
//           dateStart,
//           dateEnd,
//           totalPrice,
//         },
//       });

//       console.log(`Created review with id: ${item.id}`);
//     }
//   }

//   console.log(`Seeding finished.`);
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

console.log('hi');
