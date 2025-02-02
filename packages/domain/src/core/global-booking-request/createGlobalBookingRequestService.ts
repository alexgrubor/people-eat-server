import { type Authorization, type DataSource, type Email, type Logger } from '../..';
import { type FindManyRequest, type NanoId } from '../shared';
import { type CreateOneGlobalBookingRequestRequest } from './CreateOneGlobalBookingRequestRequest';
import { type GlobalBookingRequest } from './GlobalBookingRequest';
import { createOne } from './useCases/createOne';
import { deleteOne } from './useCases/deleteOne';
import { findMany } from './useCases/findMany';
import { findManyByCookId } from './useCases/findManyByCookId';
import { findManyByUserId } from './useCases/findManyByUserId';
import { findOne } from './useCases/findOne';

export interface GlobalBookingRequestService {
    findOne(
        context: Authorization.Context,
        request: { userId: NanoId; globalBookingRequestId: NanoId },
    ): Promise<GlobalBookingRequest | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<GlobalBookingRequest[] | undefined>;
    findManyByCookId(
        context: Authorization.Context,
        request: FindManyRequest & { cookId: NanoId },
    ): Promise<GlobalBookingRequest[] | undefined>;
    findManyByUserId(
        context: Authorization.Context,
        request: FindManyRequest & { userId: NanoId },
    ): Promise<GlobalBookingRequest[] | undefined>;
    createOne(context: Authorization.Context, request: CreateOneGlobalBookingRequestRequest & { userId: NanoId }): Promise<boolean>;
    deleteOne(context: Authorization.Context, request: { userId: NanoId; globalBookingRequestId: NanoId }): Promise<boolean>;
}

export interface CreateGlobalBookingRequestServiceInput {
    dataSourceAdapter: DataSource.Adapter;
    emailAdapter: Email.Adapter;
    logger: Logger.Adapter;
}

export function createGlobalBookingRequestService({
    dataSourceAdapter,
    emailAdapter,
    logger,
}: CreateGlobalBookingRequestServiceInput): GlobalBookingRequestService {
    return {
        findOne: (context: Authorization.Context, request: { userId: NanoId; globalBookingRequestId: NanoId }) =>
            findOne({ dataSourceAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ dataSourceAdapter, logger, context, request }),
        findManyByCookId: (context: Authorization.Context, request: FindManyRequest & { cookId: NanoId }) =>
            findManyByCookId({ dataSourceAdapter, logger, context, request }),
        findManyByUserId: (context: Authorization.Context, request: FindManyRequest & { userId: NanoId }) =>
            findManyByUserId({ dataSourceAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: CreateOneGlobalBookingRequestRequest & { userId: NanoId }) =>
            createOne({ dataSourceAdapter, logger, context, request, emailAdapter }),
        deleteOne: (context: Authorization.Context, request: { userId: NanoId; globalBookingRequestId: NanoId }) =>
            deleteOne({ dataSourceAdapter, logger, context, request }),
    };
}
