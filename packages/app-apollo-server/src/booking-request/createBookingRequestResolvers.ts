import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLBookingRequest,
    type GQLConfiguredMenu,
    type GQLCookBookingRequestMutation,
    type GQLCookBookingRequestMutationAcceptArgs,
    type GQLCookBookingRequestMutationChatMessagesArgs,
    type GQLCookBookingRequestMutationCreateOneArgs,
    type GQLCookBookingRequestMutationDeclineArgs,
    type GQLCookBookingRequestMutationUpdatePriceArgs,
    type GQLCookBookingRequestQuery,
    type GQLCookBookingRequestQueryChatMessagesArgs,
    type GQLCookBookingRequestQueryFindOneArgs,
    type GQLPublicCook,
    type GQLPublicUser,
    type GQLUserBookingRequestMutation,
    type GQLUserBookingRequestMutationAcceptArgs,
    type GQLUserBookingRequestMutationChatMessagesArgs,
    type GQLUserBookingRequestMutationCreateOneArgs,
    type GQLUserBookingRequestMutationUpdatePriceArgs,
    type GQLUserBookingRequestQuery,
    type GQLUserBookingRequestQueryChatMessagesArgs,
    type GQLUserBookingRequestQueryFindOneArgs,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createBookingRequestResolvers(
    service: Service,
): Resolvers<
    'BookingRequest' | 'UserBookingRequestMutation' | 'UserBookingRequestQuery' | 'CookBookingRequestMutation' | 'CookBookingRequestQuery'
> {
    return {
        BookingRequest: {
            user: async ({ userId }: GQLBookingRequest, _input: unknown, context: Authorization.Context): Promise<GQLPublicUser> =>
                service.publicUser.findOne(context, userId) as any,
            cook: async ({ cookId }: GQLBookingRequest, _input: unknown, context: Authorization.Context): Promise<GQLPublicCook> =>
                service.publicCook.findOne(context, cookId) as any,
            configuredMenu: async (
                { bookingRequestId }: GQLBookingRequest,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLConfiguredMenu | undefined> => service.configuredMenu.findOne(context, { bookingRequestId }),
        },
        UserBookingRequestMutation: {
            createOne: async (
                { userId }: GQLUserBookingRequestMutation,
                { request }: GQLUserBookingRequestMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<{
                success: boolean;
                clientSecret: string;
            }> => service.bookingRequest.createOne(context, { userId, ...request }),
            accept: async (
                { userId }: GQLUserBookingRequestMutation,
                { bookingRequestId }: GQLUserBookingRequestMutationAcceptArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.bookingRequest.acceptOneByUserId(context, { userId, bookingRequestId }),
            decline: async (
                { userId }: GQLUserBookingRequestMutation,
                { bookingRequestId }: GQLUserBookingRequestMutationAcceptArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.bookingRequest.declineOneByUserId(context, { userId, bookingRequestId }),
            updatePrice: async (
                { userId }: GQLUserBookingRequestMutation,
                { bookingRequestId, price }: GQLUserBookingRequestMutationUpdatePriceArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.bookingRequest.updatePriceByUserId(context, { userId, bookingRequestId, price }),

            chatMessages: (
                { userId }: GQLUserBookingRequestMutation,
                { bookingRequestId }: GQLUserBookingRequestMutationChatMessagesArgs,
            ) => ({ userId, bookingRequestId } as any),
        },
        UserBookingRequestQuery: {
            findMany: async (
                { userId }: GQLUserBookingRequestQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLBookingRequest[] | undefined> => service.bookingRequest.findManyByUserId(context, { userId }) as any,
            findOne: async (
                { userId }: GQLUserBookingRequestQuery,
                { bookingRequestId }: GQLUserBookingRequestQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLBookingRequest | undefined> =>
                service.bookingRequest.findOneByUserId(context, { userId, bookingRequestId }) as any,

            chatMessages: ({ userId }: GQLUserBookingRequestQuery, { bookingRequestId }: GQLUserBookingRequestQueryChatMessagesArgs) =>
                ({ userId, bookingRequestId } as any),
        },
        CookBookingRequestMutation: {
            createOne: async (
                { cookId }: GQLCookBookingRequestMutation,
                { globalBookingRequestId }: GQLCookBookingRequestMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.bookingRequest.createOneByGlobalBookingRequestId(context, { cookId, globalBookingRequestId }),
            accept: async (
                { cookId }: GQLCookBookingRequestMutation,
                { bookingRequestId }: GQLCookBookingRequestMutationAcceptArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.bookingRequest.acceptOneByCookId(context, { cookId, bookingRequestId }),
            decline: async (
                { cookId }: GQLCookBookingRequestMutation,
                { bookingRequestId }: GQLCookBookingRequestMutationDeclineArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.bookingRequest.declineOneByCookId(context, { cookId, bookingRequestId }),
            updatePrice: async (
                { cookId }: GQLCookBookingRequestMutation,
                { bookingRequestId, price }: GQLCookBookingRequestMutationUpdatePriceArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.bookingRequest.updatePriceByCookId(context, { cookId, bookingRequestId, price }),

            chatMessages: (
                { cookId }: GQLCookBookingRequestMutation,
                { bookingRequestId }: GQLCookBookingRequestMutationChatMessagesArgs,
            ) => ({ cookId, bookingRequestId } as any),
        },
        CookBookingRequestQuery: {
            findMany: async (
                { cookId }: GQLCookBookingRequestQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLBookingRequest[] | undefined> => service.bookingRequest.findManyByCookId(context, { cookId }) as any,
            findOne: async (
                { cookId }: GQLCookBookingRequestQuery,
                { bookingRequestId }: GQLCookBookingRequestQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLBookingRequest | undefined> =>
                service.bookingRequest.findOneByCookId(context, { cookId, bookingRequestId }) as any,

            chatMessages: ({ cookId }: GQLCookBookingRequestQuery, { bookingRequestId }: GQLCookBookingRequestQueryChatMessagesArgs) =>
                ({ cookId, bookingRequestId } as any),
        },
    };
}
