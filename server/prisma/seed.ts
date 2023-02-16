// TODO: Write a function that takes in json file and adds 2 years to every date listed
import users from './user_and_reviews_reservations.json';
import hosts from './host_and_listings_final_final.json';
// import proper_dates_unavailable from './proper_dates_unavailable.json';
import { PrismaClient, Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

const userData = Promise.all(
  users.map(async (user) => {
    const hashedPassword = await hash(user.password, 10);

    const userObj: Prisma.UserCreateInput = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: hashedPassword,
      dateJoined: user.dateJoined,
    };

    return userObj;
  }),
);

const hostData = hosts.map((host) => {
  const hostObj: Prisma.HostCreateInput = {
    id: host.id,
    firstName: host.firstName,
    dateJoined: host.dateJoined,
    description: host.description,
    details: host.details,
    medals: host.medals,
  };

  return hostObj;
});

async function main() {
  console.log(`Start seeding ...`);
  // seeding users
  for (const u of await userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }

  // seeding hosts
  for (const h of hostData) {
    const host = await prisma.host.create({
      data: h,
    });
    console.log(`Created host with id: ${host.id}`);
  }

  //seeding listings
  for (const host of hosts) {
    const listings = host.listings;
    for (const listing of listings) {
      const item = await prisma.listing.create({
        data: {
          id: listing.id,
          hostId: listing.hostId,
          title: listing.title,
          street: listing.street,
          city: listing.city,
          state: listing.state,
          zipCode: listing.zipcode,
          address: listing.address,
          location: listing.location,
          region: listing.region,
          listingDescription: listing.listingDescription,
          locationDescription: listing.locationDescription,
          stayDescription: listing.stayDescription,
          price: listing.price,
          cleaningFee: listing.cleaningFee,
          numGuests: listing.numGuests,
          numBedrooms: listing.numBedrooms,
          numBeds: listing.numBeds,
          numBaths: listing.numBaths,
          smokingRule: listing.smokingRule,
          petsRule: listing.petsRule,
          superhost: listing.superhost,
          languages: listing.languages,
          imageComments: listing.imageComments,
          listingType: listing.listingType,
          basicAmenities: listing.basicAmenities,
          amenities: listing.amenities,
          houseRules: listing.houseRules,
          healthAndSafety: listing.healthAndSafety,
          highlights: listing.highlights,
          score: listing.score,
          scores: listing.scoreBreakdown,
          datesUnavailable: listing.datesUnavailable,
          tags: listing.tags,
        },
      });
      console.log(`Created listing with id: ${item.id}`);
    }
  }

  // Seeding Reviews
  for (const user of users) {
    const reviews = user.reviews;
    for (const review of reviews) {
      const { listingId, date, content, authorId, scores } = review;

      const item = await prisma.review.create({
        data: {
          listingId,
          authorId,
          date,
          content,
          scores,
        },
      });

      console.log(`Created review with id: ${item.id}`);
    }
  }

  // Seeding reservations
  for (const user of users) {
    const reservations = user.reservations;
    for (const reservation of reservations) {
      const { listingId, userId, dateStart, dateEnd, totalPrice } = reservation;

      const item = await prisma.reservation.create({
        data: {
          listingId,
          userId,
          dateStart,
          dateEnd,
          totalPrice,
        },
      });

      console.log(`Created reservation with id: ${item.id}`);
    }
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
