import cloudinary from 'cloudinary';
import { permissions } from './permissions';
import { APP_SECRET, getUserId } from './utils';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { applyMiddleware } from 'graphql-middleware';
import {
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  intArg,
  inputObjectType,
  arg,
  asNexusMethod,
  list,
  booleanArg,
} from 'nexus';
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars';
import objectHash from 'object-hash';
import { Context } from './context';
import { Listing, Prisma } from '.prisma/client';
import { addDays, format, differenceInDays } from 'date-fns';

export const dateTimeScalar = asNexusMethod(DateTimeResolver, 'date');
export const jsonScalar = asNexusMethod(JSONObjectResolver, 'json');

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

// Artificially slows down requests to simulate an actual server and show loaders
const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('me', {
      type: 'User',
      resolve: (_parent, _args, context: Context) => {
        const userId = getUserId(context);

        return context.prisma.user.findUnique({
          where: {
            id: userId,
          },
        });
      },
    });

    t.field('listingById', {
      type: 'Listing',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.listing.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    });

    t.field('reservationById', {
      type: 'Reservation',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        try {
          const data = await context.prisma.reservation.findUnique({
            where: {
              id: args.id,
            },
          });

          if (!data) throw new Error('Reservation not found');

          return data;
        } catch (e: any) {
          return e;
        }
      },
    });

    t.nonNull.list.nonNull.field('reservationsByUserId', {
      type: list('Reservation'),
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        const future = (
          await context.prisma.reservation.findMany({
            where: {
              userId: args.id,
              dateStart: {
                gte: new Date(),
              },
            },
          })
        ).sort((a, b) => a.dateStart.valueOf() - b.dateStart.valueOf());

        const past = (
          await context.prisma.reservation.findMany({
            where: {
              userId: args.id,
              dateStart: {
                lt: new Date(),
              },
            },
          })
        ).sort((a, b) => b.dateStart.valueOf() - a.dateStart.valueOf());

        return [future, past];
      },
    });

    t.nonNull.list.nonNull.field('reviewsByHostId', {
      type: 'Review',
      args: {
        id: nonNull(stringArg()),
        offset: intArg(),
      },
      resolve: async (_parent, args, context: Context) => {
        const reviews = await context.prisma.review.findMany({
          skip: args.offset || 0,
          take: 10,
          where: {
            listing: {
              hostId: args.id,
            },
          },
        });

        await sleep(Math.random() * 50 + 100);

        return reviews;
      },
    });

    t.nonNull.list.nonNull.field('reviewsByUserId', {
      type: 'Review',
      args: {
        id: nonNull(stringArg()),
        offset: intArg(),
      },
      resolve: async (_parent, args, context: Context) => {
        const data = await context.prisma.review.findMany({
          skip: args.offset || 0,
          take: 3,
          where: {
            authorId: args.id,
          },
        });

        await sleep(Math.random() * 50 + 100);

        return data;
      },
    });

    t.nonNull.list.nonNull.field('reviewsByListingId', {
      type: 'Review',
      args: {
        id: nonNull(stringArg()),
        offset: intArg(),
      },
      resolve: async (_parent, args, context: Context) => {
        const data = await context.prisma.review.findMany({
          skip: args.offset || 0,
          take: 8,
          where: {
            listingId: args.id,
          },
        });

        await sleep(Math.random() * 50 + 100);

        return data;
      },
    });

    t.field('userById', {
      type: 'User',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.user.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    });

    t.field('hostById', {
      type: 'Host',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.host.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    });

    t.field('basicSearch', {
      type: BasicSearchResults,
      args: {
        region: stringArg(),
        guests: intArg(),
        checkIn: stringArg(),
        checkOut: stringArg(),
        offset: nonNull(intArg()),
        tags: list(nonNull(stringArg())),
        listingType: list(nonNull(stringArg())),
        languages: list(nonNull(stringArg())),
        entire: booleanArg(),
        privateListing: booleanArg(),
        pets: booleanArg(),
        smoking: booleanArg(),
        superhost: booleanArg(),
      },
      resolve: async (_parent, args, context: Context) => {
        console.log('IN BASIC SEARCH');
        console.log('args are ... ', args);

        const renderOptions = ({ isCount }: { isCount: boolean }) => {
          let options: {
            skip: number;
            take: number;
            where: Prisma.ListingWhereInput;
          };

          if (/anywhere/i.test(args.region as string) || !args.region) {
            options = {
              skip: isCount ? 0 : args.offset,
              take: isCount ? 100 : 10,
              where: {
                numGuests: {
                  gte: args.guests ? args.guests : 0,
                },
                NOT: {
                  datesUnavailable: {
                    hasSome: args.checkIn ? daysRequested : [],
                  },
                },
              },
            };
          } else {
            options = {
              skip: isCount ? 0 : args.offset,
              take: isCount ? 100 : 10,
              where: {
                region: args.region,
                numGuests: {
                  gte: args.guests ? args.guests : 0,
                },
                NOT: {
                  datesUnavailable: {
                    hasSome: args.checkIn ? daysRequested : [],
                  },
                },
              },
            };
          }

          // Additional filters
          // Check for superhost, listingType, pets, smoking, entire/private, languages and append to options
          if (args.superhost) {
            options.where['superhost'] = true;
          }

          if (args.entire && args.privateListing) {
            // do nothing
          } else if (args.entire) {
            options.where['listingType'] = {
              startsWith: 'Entire',
            };
          } else if (args.privateListing) {
            options.where['listingType'] = {
              startsWith: 'Private',
            };
          }

          if (args.smoking) {
            options.where['smokingRule'] = true;
          }

          if (args.pets) {
            options.where['petsRule'] = true;
          }

          if (args.tags) {
            options.where['tags'] = {
              hasEvery: args.tags,
            };
          }

          if (args.languages) {
            options.where['languages'] = {
              hasSome: args.languages,
            };
          }

          if (args.listingType) {
            options.where['listingType'] = {
              in: args.listingType,
            };
          }

          return options;
        };

        const daysRequested: string[] = [];
        const checkIn = new Date(args.checkIn as string);
        const checkOut = new Date(args.checkOut as string);

        const distance = differenceInDays(checkIn, checkOut) * -1;

        for (let i = 0; i <= distance; i++) {
          daysRequested.push(format(addDays(checkIn, i), 'M/d/yyyy'));
        }

        const listings = await context.prisma.listing.findMany(
          renderOptions({ isCount: false }),
        );

        const count = await context.prisma.listing.count(
          renderOptions({ isCount: true }),
        );

        return { count, listings, offset: args.offset };
      },
    });

    t.nonNull.list.nonNull.field('allListings', {
      type: 'Listing',
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.listing.findMany();
      },
    });

    t.nonNull.list.nonNull.field('listingsByRegion', {
      type: 'Listing',
      args: {
        region: nonNull(stringArg()),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.listing.findMany({
          where: {
            region: args.region,
          },
        });
      },
    });
  },
});

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        await sleep(Math.random() * 200 + 300);

        try {
          const userExists = await context.prisma.user.findUnique({
            where: {
              email: args.email,
            },
          });

          if (userExists) {
            throw new Error('User with this email already exists');
          }

          const hashedPassword = await hash(args.password, 10);

          const dateJoined = `Joined in ${new Date().getFullYear()}`;
          const id = objectHash(args);

          const imageURL = `https://avatars.dicebear.com/api/human/${id}.svg`;

          await cloudinary.v2.uploader.upload(imageURL, {
            public_id: `user_avatars/${id}`,
          });

          const user = await context.prisma.user.create({
            data: {
              id,
              dateJoined,
              firstName: args.firstName,
              lastName: args.lastName,
              email: args.email,
              password: hashedPassword,
            },
          });

          return {
            token: sign({ userId: user.id }, APP_SECRET),
            user,
          };
        } catch (e: any) {
          return e;
        }
      },
    });

    t.field('verifyEmail', {
      type: 'Boolean',
      args: {
        email: nonNull(stringArg()),
      },
      resolve: async (_, { email }, context: Context) => {
        await sleep(Math.random() * 600 + 400);

        const user = await context.prisma.user.findUnique({
          where: {
            email,
          },
        });

        return !!user;
      },
    });

    t.field('verifyTripAuth', {
      type: 'Boolean',
      args: {
        userId: nonNull(stringArg()),
        reservationId: nonNull(stringArg()),
      },
      resolve: async (_, args, context: Context) => {
        // await sleep(Math.random() * 600 + 400);

        const userReservations = await context.prisma.user
          .findUnique({
            where: {
              id: args.userId,
            },
          })
          .reservations();

        const result = userReservations.filter(
          (res) => res.id === args.reservationId,
        ).length;

        return result > 0;
      },
    });

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, { email, password }, context: Context) => {
        await sleep(Math.random() * 600 + 400);

        try {
          const user = await context.prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (!user) throw new Error(`No user found for email: ${email}`);

          const passwordValid = await compare(password, user.password);
          if (!passwordValid) throw new Error('Invalid password');

          return {
            token: sign({ userId: user.id }, APP_SECRET),
            user,
          };
        } catch (e: any) {
          return e;
        }
      },
    });

    // Creating a Reservation
    t.field('createReservation', {
      type: 'Reservation',
      args: {
        data: nonNull(
          arg({
            type: 'ReservationCreateInput',
          }),
        ),
      },
      resolve: async (_, args, context: Context) => {
        const userId = getUserId(context);

        if (!userId) {
          throw new Error('No such userId');
        }

        const listing = await context.prisma.listing.findUnique({
          where: { id: args.data.listingId },
          select: {
            datesUnavailable: true,
          },
        });

        if (!listing) {
          throw new Error('No such listing');
        }

        const datesUnavailable = listing.datesUnavailable;
        const start = new Date(args.data.dateStart);

        while (
          start.toLocaleDateString() !== args.data.dateEnd.toLocaleDateString()
        ) {
          datesUnavailable.push(start.toLocaleDateString());
          start.setDate(start.getDate() + 1);
        }

        // Push in the the ending date too;
        datesUnavailable.push(start.toLocaleDateString());

        await context.prisma.listing.update({
          where: { id: args.data.listingId },
          data: {
            datesUnavailable: datesUnavailable,
          },
        });

        return context.prisma.reservation.create({
          data: {
            userId: userId,
            listingId: args.data.listingId,
            dateStart: args.data.dateStart,
            dateEnd: args.data.dateEnd,
            totalPrice: args.data.totalPrice,
          },
        });
      },
    });

    // Deleting a Reservation
    t.field('deleteReservation', {
      type: 'Reservation',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, args, context: Context) => {
        const reservation = await context.prisma.reservation.findUnique({
          where: { id: args.id },
          select: {
            dateStart: true,
            dateEnd: true,
            listingId: true,
          },
        });

        if (!reservation) throw new Error('No such reservation');

        const listing = await context.prisma.listing.findUnique({
          where: { id: reservation?.listingId },
          select: {
            datesUnavailable: true,
          },
        });

        if (!listing) throw new Error('No such listing');

        const datesUnavailable = listing.datesUnavailable;

        const distance =
          differenceInDays(reservation.dateStart, reservation.dateEnd) * -1;

        const idxStart = datesUnavailable.findIndex(
          (date) => date === reservation.dateStart.toLocaleDateString(),
        );

        if (idxStart !== -1) {
          datesUnavailable.splice(idxStart, distance + 1);
        }

        await context.prisma.listing.update({
          where: { id: reservation.listingId },
          data: {
            datesUnavailable: datesUnavailable,
          },
        });

        return context.prisma.reservation.delete({
          where: { id: args.id },
        });
      },
    });

    // Creating a Review
    t.field('createReview', {
      type: 'Review',
      args: {
        data: nonNull(
          arg({
            type: 'ReviewCreateInput',
          }),
        ),
      },
      resolve: (_, args, context: Context) => {
        const authorId = getUserId(context);

        if (authorId === undefined) throw new Error('There is no user!');

        return context.prisma.review.create({
          data: {
            authorId: authorId,
            listingId: args.data.listingId,
            content: args.data.content,
            scores: args.data.scores,
          },
        });
      },
    });

    // Deleting a Review
    t.field('deleteReview', {
      type: 'Review',
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_, args, context: Context) => {
        return context.prisma.review.delete({
          where: { id: args.id },
        });
      },
    });
  },
});

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('firstName');
    t.nonNull.string('lastName');
    t.nonNull.string('email');
    t.nonNull.string('dateJoined');
    t.nonNull.field('reviewsCount', {
      type: 'Int',
      resolve: async (parent, _args, context: Context) => {
        const data = await context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .reviews();

        return data.length;
      },
    });
    t.nonNull.field('reviews', {
      type: list('Review'),
      resolve: (parent, _, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .reviews();
      },
    });
    t.nonNull.field('reservations', {
      type: list('Reservation'),
      resolve: (parent, _, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .reservations();
      },
    });
  },
});

const Reservation = objectType({
  name: 'Reservation',
  definition(t) {
    t.nonNull.string('id');
    t.field('user', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.reservation
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .user();
      },
    });
    t.nonNull.string('userId');
    t.field('listing', {
      type: 'Listing',
      resolve: (parent, _, context: Context) => {
        return context.prisma.reservation
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .listing();
      },
    });
    t.nonNull.string('listingId');
    t.nonNull.field('dateStart', { type: 'DateTime' });
    t.nonNull.field('dateEnd', { type: 'DateTime' });
    t.nonNull.float('totalPrice');
  },
});

const Host = objectType({
  name: 'Host',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('firstName');
    t.nonNull.string('dateJoined');
    t.string('description');
    t.nonNull.field('details', { type: list('String') });
    t.nonNull.field('medals', { type: list('String') });
    t.nonNull.field('listings', {
      type: list('Listing'),
      resolve: (parent, _, context: Context) => {
        return context.prisma.host
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .listings();
      },
    });
  },
});

const Listing = objectType({
  name: 'Listing',
  definition(t) {
    t.nonNull.string('id');
    t.field('host', {
      type: 'Host',
      resolve: (parent, _, context: Context) => {
        return context.prisma.listing
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .host();
      },
    });
    t.nonNull.string('hostId');
    t.nonNull.string('title');
    t.nonNull.string('street');
    t.nonNull.string('city');
    t.nonNull.string('state');
    t.nonNull.string('zipCode');
    t.nonNull.string('address');
    t.nonNull.string('location');
    t.nonNull.string('region');
    t.string('listingDescription');
    t.string('locationDescription');
    t.string('stayDescription');
    t.nonNull.int('price');
    t.nonNull.int('cleaningFee');
    t.nonNull.int('numGuests');
    t.nonNull.int('numBedrooms');
    t.nonNull.int('numBeds');
    t.nonNull.int('numBaths');
    t.nonNull.boolean('smokingRule');
    t.nonNull.boolean('petsRule');
    t.nonNull.boolean('superhost');
    t.nonNull.field('languages', { type: list('String') });
    t.nonNull.field('imageComments', { type: list('String') });
    t.nonNull.string('listingType');
    t.nonNull.field('basicAmenities', { type: list('String') });
    t.nonNull.field('amenities', { type: list('String') });
    t.nonNull.field('houseRules', { type: list('String') });
    t.nonNull.field('healthAndSafety', { type: list('String') });
    t.nonNull.field('highlights', { type: list('String') });
    t.nonNull.float('score');
    t.nonNull.field('averageScore', {
      type: 'Float',
      resolve: async (parent, _args, context: Context) => {
        const reviews = await context.prisma.listing
          .findUnique({
            where: { id: parent.id },
          })
          .reviews();

        if (reviews == null || reviews.length === 0) return 0;

        const averagedReviews = reviews.map((review) => {
          return (
            review.scores
              .map((cat) => {
                return Number(cat.split('||')[1]);
              })
              .reduce((acc, cv) => {
                return acc + cv;
              }, 0) / 6
          );
        });

        const output =
          averagedReviews.reduce((acc, cv) => acc + cv, 0) /
          averagedReviews.length;

        return Number(output.toFixed(2));
      },
    });
    t.nonNull.field('averageScores', {
      type: ReviewScores,
      resolve: async (parent, _args, context: Context) => {
        const reviews = await context.prisma.listing
          .findUnique({
            where: { id: parent.id },
          })
          .reviews();

        const noScores = {
          cleanliness: 0.0,
          accuracy: 0.0,
          communication: 0.0,
          location: 0.0,
          checkin: 0.0,
          value: 0,
        };

        if (!reviews.length) return noScores;

        const averagedReviews = reviews
          .map((review) => {
            return review.scores.map((cat) => {
              return Number(cat.split('||')[1]);
            });
          })
          .reduce((acc, cv) => {
            for (let i = 0; i < acc.length; i++) {
              acc[i] += cv[i];
            }

            return acc;
          });

        for (let i = 0; i < averagedReviews.length; i++) {
          averagedReviews[i] = +(averagedReviews[i] / reviews.length).toFixed(
            1,
          );
        }

        if (!averagedReviews.length) return noScores;

        return {
          cleanliness: averagedReviews[0],
          accuracy: averagedReviews[1],
          communication: averagedReviews[2],
          location: averagedReviews[3],
          checkin: averagedReviews[4],
          value: averagedReviews[5],
        };
      },
    });
    t.nonNull.field('scores', { type: list('String') });
    t.nonNull.field('datesUnavailable', { type: list('String') });
    t.nonNull.field('reviewsCount', {
      type: 'Int',
      resolve: async (parent, _args, context: Context) => {
        const data = await context.prisma.listing
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .reviews();

        return data.length;
      },
    });
    t.nonNull.field('reviews', {
      type: list('Review'),
      resolve: (parent, _, context: Context) => {
        return context.prisma.listing
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .reviews();
      },
    });
    t.nonNull.field('reservations', {
      type: list('Reservation'),
      resolve: (parent, _, context: Context) => {
        return context.prisma.listing
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .reservations();
      },
    });
  },
});

const Review = objectType({
  name: 'Review',
  definition(t) {
    t.nonNull.string('id');
    t.field('listing', {
      type: 'Listing',
      resolve: (parent, _, context: Context) => {
        return context.prisma.review
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .listing();
      },
    });
    t.nonNull.string('listingId');
    t.nonNull.field('date', { type: 'DateTime' });
    t.nonNull.string('content');
    t.field('author', {
      type: 'User',
      resolve: (parent, _, context: Context) => {
        return context.prisma.review
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .author();
      },
    });
    t.nonNull.string('authorId');
    t.nonNull.field('scores', { type: list('String') });
  },
});

const ReviewScores = objectType({
  name: 'ReviewScores',
  definition(t) {
    t.nonNull.float('cleanliness');
    t.nonNull.float('accuracy');
    t.nonNull.float('communication');
    t.nonNull.float('location');
    t.nonNull.float('checkin');
    t.nonNull.float('value');
  },
});

const BasicSearchResults = objectType({
  name: 'BasicSearchResults',
  definition(t) {
    t.nonNull.int('count');
    t.nonNull.field('listings', {
      type: nonNull(list('Listing')),
    });
    t.nonNull.int('offset');
  },
});

const ReservationCreateInput = inputObjectType({
  name: 'ReservationCreateInput',
  definition(t) {
    t.nonNull.string('listingId');
    t.nonNull.field('dateStart', {
      type: 'DateTime',
    });
    t.nonNull.field('dateEnd', {
      type: 'DateTime',
    });
    t.nonNull.int('totalPrice');
  },
});

const ReviewCreateInput = inputObjectType({
  name: 'ReviewCreateInput',
  definition(t) {
    t.nonNull.string('authorId');
    t.nonNull.string('listingId');
    t.nonNull.string('content');
    t.nonNull.field('scores', { type: list(nonNull('String')) });
  },
});

const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token');
    t.field('user', { type: 'User' });
  },
});

const schemaWithoutPermissions = makeSchema({
  types: [
    Query,
    Mutation,
    User,
    Reservation,
    Host,
    Listing,
    Review,
    AuthPayload,
    dateTimeScalar,
    jsonScalar,
    ReviewScores,
    BasicSearchResults,
    ReservationCreateInput,
    ReviewCreateInput,
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});

export const schema = applyMiddleware(schemaWithoutPermissions, permissions);
