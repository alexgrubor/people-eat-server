import { type Authorization, type Course, type DataSource, type Logger, type PublicMenu } from '../..';
import { type NanoId } from '../shared';
import { findAllCourses } from './useCases/findAllCourses';
import { findMany } from './useCases/findMany';
import { findManyByCookId } from './useCases/findManyByCookId';
import { findOne } from './useCases/findOne';

export interface PublicMenuService {
    findOne(context: Authorization.Context, menuId: string): Promise<PublicMenu | undefined>;
    findMany(context: Authorization.Context): Promise<PublicMenu[] | undefined>;
    findManyByCookId(context: Authorization.Context, request: { cookId: NanoId }): Promise<PublicMenu[] | undefined>;
    findAllCourses(context: Authorization.Context, request: { menuId: NanoId }): Promise<Course[] | undefined>;
}

export interface CreatePublicMenuServiceInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
}

export function createPublicMenuService({ dataSourceAdapter, logger }: CreatePublicMenuServiceInput): PublicMenuService {
    return {
        findOne: (context: Authorization.Context, menuId: string) => findOne({ dataSourceAdapter, logger, context, request: { menuId } }),
        findMany: (context: Authorization.Context) => findMany({ dataSourceAdapter, logger, context, request: {} }),
        findManyByCookId: (context: Authorization.Context, request: { cookId: NanoId }) =>
            findManyByCookId({ dataSourceAdapter, logger, context, request }),
        findAllCourses: (context: Authorization.Context, request: { menuId: NanoId }) =>
            findAllCourses({ dataSourceAdapter, logger, context, request }),
    };
}
