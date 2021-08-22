import { rule, shield } from 'graphql-shield';
import { getUserId } from '../utils';
import { Context } from '../context';

const rules = {
  isAuthenticatedUser: rule()((_parent, _args, context: Context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
  isReviewOwner: rule()(async (_parent, args, context: Context) => {
    const userId = getUserId(context);
    const user = await context.prisma.review
      .findUnique({
        where: {
          id: args.id,
        },
      })
      .author();
    return userId === user?.id;
  }),
  isReservationOwner: rule()(async (_parent, args, context: Context) => {
    const userId = getUserId(context);
    const user = await context.prisma.reservation
      .findUnique({
        where: {
          id: args.id,
        },
      })
      .user();
    return userId === user?.id;
  }),
};

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
  },
  Mutation: {
    createReview: rules.isAuthenticatedUser,
    deleteReview: rules.isReviewOwner,
    createReservation: rules.isAuthenticatedUser,
    deleteReservation: rules.isReservationOwner,
  },
});
