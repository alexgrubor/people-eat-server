import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLAdmin,
    type GQLAdminMutation,
    type GQLAdminMutationCreateOneArgs,
    type GQLAdminQuery,
    type GQLAdminQueryFindManyArgs,
    type GQLAdminQueryFindOneArgs,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createAdminResolvers(service: Service): Resolvers<'Admin' | 'AdminMutation' | 'AdminQuery'> {
    return {
        Admin: {},
        AdminMutation: {
            createOne: async (
                _parent: GQLAdminMutation,
                { request }: GQLAdminMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.admin.createOne(context, request),
        },
        AdminQuery: {
            findOne: async (
                _parent: GQLAdminQuery,
                { adminId }: GQLAdminQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLAdmin | undefined> => service.admin.findOne(context, { adminId }) as any,
            findMany: async (
                _parent: GQLAdminQuery,
                _input: GQLAdminQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLAdmin[]> => service.admin.findMany(context, {}) as any,
        },
    };
}
