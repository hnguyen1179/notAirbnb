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
  inputObjectType,
  arg,
  asNexusMethod,
  list,
} from 'nexus';
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars';
import { Context } from './context';

export const dateTimeScalar = asNexusMethod(DateTimeResolver, 'date');
export const jsonScalar = asNexusMethod(JSONObjectResolver, 'json');

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nullable.field('me', {
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

    t.nullable.field('listingById', {
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
        id: nonNull(stringArg()),
        dateJoined: nonNull(stringArg()),
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context: Context) => {
        const hashedPassword = await hash(args.password, 10);
        const user = await context.prisma.user.create({
          data: {
            id: args.id,
            dateJoined: args.dateJoined,
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
      },
    });

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, { email, password }, context: Context) => {
        const user = await context.prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          throw new Error(`No user found for email: ${email}`);
        }
        const passwordValid = await compare(password, user.password);
        if (!passwordValid) {
          throw new Error('Invalid password');
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        };
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

        if (userId === undefined) throw new Error('User undefined');

        const data = await context.prisma.listing.findUnique({
          where: { id: args.data.listingId },
          select: {
            datesUnavailable: true,
          },
        });

        if (!data?.datesUnavailable) throw new Error('Dates Undefined');

        const datesUnavailable: any = data?.datesUnavailable;
        const start = new Date(args.data.dateStart);

        while (
          start.toLocaleDateString() !== args.data.dateEnd.toLocaleDateString()
        ) {
          datesUnavailable[start.toLocaleDateString()] = true;
          start.setDate(start.getDate() + 1);
        }

        context.prisma.listing.update({
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
      resolve: (_, args, context: Context) => {
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

        if (authorId === undefined) throw new Error('wtf??');

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
    t.nonNull.field('scores', { type: list('String') });
    t.nonNull.field('datesUnavailable', { type: 'JSONObject' });
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
