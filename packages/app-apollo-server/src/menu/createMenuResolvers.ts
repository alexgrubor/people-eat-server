import { type Authorization, type Category, type Kitchen, type MenuCategory, type Service } from '@people-eat/server-domain';
import {
    type GQLCategory,
    type GQLCookMenuMutation,
    type GQLCookMenuMutationCreateOneArgs,
    type GQLCookMenuMutationDeleteOneArgs,
    type GQLCookMenuMutationUpdateBasePriceArgs,
    type GQLCookMenuMutationUpdateBasePriceCustomersArgs,
    type GQLCookMenuMutationUpdateCurrencyCodeArgs,
    type GQLCookMenuMutationUpdateDescriptionArgs,
    type GQLCookMenuMutationUpdateGreetingFromKitchenArgs,
    type GQLCookMenuMutationUpdateIsVisibleArgs,
    type GQLCookMenuMutationUpdateKitchenIdArgs,
    type GQLCookMenuMutationUpdatePreparationTimeArgs,
    type GQLCookMenuMutationUpdatePricePerAdultArgs,
    type GQLCookMenuMutationUpdatePricePerChildArgs,
    type GQLCookMenuMutationUpdateTitleArgs,
    type GQLCookMenuQuery,
    type GQLCookMenuQueryFindManyArgs,
    type GQLCookMenuQueryFindOneArgs,
    type GQLKitchen,
    type GQLMenu,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createMenuResolvers(service: Service): Resolvers<'Menu' | 'CookMenuMutation' | 'CookMenuQuery'> {
    return {
        Menu: {
            categories: async ({ menuId }: GQLMenu, _input: unknown, context: Authorization.Context): Promise<GQLCategory[]> => {
                const menuCategories: MenuCategory[] | undefined = await service.menuCategory.findAll(context, { menuId });
                const categories: Category[] | undefined = await service.category.findMany(context, {});
                if (!menuCategories || !categories) return [];
                return categories.filter(
                    ({ categoryId }: Category) =>
                        menuCategories.findIndex(({ categoryId: menuCategoryId }: MenuCategory) => categoryId === menuCategoryId) !== -1,
                );
            },
            kitchen: async ({ kitchenId }: GQLMenu, _input: unknown, context: Authorization.Context): Promise<GQLKitchen | undefined> => {
                if (kitchenId) {
                    const kitchen: Kitchen | undefined = await service.kitchen.findOne(context, { kitchenId });
                    return kitchen;
                }
            },
            imageUrls: async ({ menuId }: GQLMenu, _input: unknown, context: Authorization.Context): Promise<string[]> =>
                service.menu.findImageUrls(context, { menuId }),
        },
        CookMenuMutation: {
            createOne: async (
                { cookId }: GQLCookMenuMutation,
                { menu }: GQLCookMenuMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.menu.createOne(context, { cookId, ...menu }),
            deleteOne: async (
                { cookId }: GQLCookMenuMutation,
                { menuId }: GQLCookMenuMutationDeleteOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.menu.deleteOne(context, { cookId, menuId }),

            updateIsVisible: async (
                { cookId }: GQLCookMenuMutation,
                request: GQLCookMenuMutationUpdateIsVisibleArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.menu.updateIsVisible(context, { cookId, ...request }),
            updateTitle: async (
                { cookId }: GQLCookMenuMutation,
                request: GQLCookMenuMutationUpdateTitleArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.menu.updateTitle(context, { cookId, ...request }),
            updateDescription: async (
                { cookId }: GQLCookMenuMutation,
                request: GQLCookMenuMutationUpdateDescriptionArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.menu.updateDescription(context, { cookId, ...request }),
            updatePreparationTime: async (
                { cookId }: GQLCookMenuMutation,
                request: GQLCookMenuMutationUpdatePreparationTimeArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.menu.updatePreparationTime(context, { cookId, ...request }),
            updateKitchenId: async (
                { cookId }: GQLCookMenuMutation,
                request: GQLCookMenuMutationUpdateKitchenIdArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.menu.updateKitchenId(context, { cookId, ...request }),
            updateGreetingFromKitchen: async (
                { cookId }: GQLCookMenuMutation,
                request: GQLCookMenuMutationUpdateGreetingFromKitchenArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.menu.updateGreetingFromKitchen(context, { cookId, ...request }),
            updateBasePrice: async (
                { cookId }: GQLCookMenuMutation,
                request: GQLCookMenuMutationUpdateBasePriceArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.menu.updateBasePrice(context, { cookId, ...request }),
            updateBasePriceCustomers: async (
                { cookId }: GQLCookMenuMutation,
                request: GQLCookMenuMutationUpdateBasePriceCustomersArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.menu.updateBasePriceCustomers(context, { cookId, ...request }),
            updatePricePerAdult: async (
                { cookId }: GQLCookMenuMutation,
                request: GQLCookMenuMutationUpdatePricePerAdultArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.menu.updatePricePerAdult(context, { cookId, ...request }),
            updatePricePerChild: async (
                { cookId }: GQLCookMenuMutation,
                request: GQLCookMenuMutationUpdatePricePerChildArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.menu.updatePricePerChild(context, { cookId, ...request }),
            updateCurrencyCode: async (
                { cookId }: GQLCookMenuMutation,
                request: GQLCookMenuMutationUpdateCurrencyCodeArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.menu.updateCurrencyCode(context, { cookId, ...request }),
        },
        CookMenuQuery: {
            findMany: async (
                { cookId }: GQLCookMenuQuery,
                { request }: GQLCookMenuQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLMenu[]> => service.menu.findMany(context, { cookId, ...request }) as any,
            findOne: async (
                { cookId }: GQLCookMenuQuery,
                { menuId }: GQLCookMenuQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLMenu | undefined> => service.menu.findOne(context, { cookId, menuId }) as any,
        },
    };
}
