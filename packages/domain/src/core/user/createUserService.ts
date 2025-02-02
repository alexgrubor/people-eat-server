import { type ReadStream } from 'fs';
import { type Authorization, type DataSource, type Email, type IdentityProvider, type Logger, type SMS } from '../..';
import { type FindManyRequest, type Gender, type NanoId } from '../shared';
import {
    type CreateOneUserByEmailAddressRequest,
    type CreateOneUserByIdentityProviderRequest,
    type CreateOneUserByPhoneNumberRequest,
} from './CreateOneUserRequest';
import { createOneByEmailAddress } from './useCases/createOneByEmailAddress';
import { createOneByIdentityProvider } from './useCases/createOneByIdentityProvider';
import { createOneByPhoneNumber } from './useCases/createOneByPhoneNumber';
import { findMany } from './useCases/findMany';
import { findOneByUserId, type FindOneUserByUserIdRequest } from './useCases/findOneByUserId';
import { updateGender } from './useCases/updateGender';
import { updatePassword } from './useCases/updatePassword';
import { updateProfilePicture } from './useCases/updateProfilePicture';
import { type User } from './User';

export interface UserService {
    findOneByUserId(context: Authorization.Context, request: FindOneUserByUserIdRequest): Promise<User | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<User[] | undefined>;
    createOneByEmailAddress(context: Authorization.Context, request: CreateOneUserByEmailAddressRequest): Promise<boolean>;
    createOneByPhoneNumber(context: Authorization.Context, request: CreateOneUserByPhoneNumberRequest): Promise<boolean>;
    createOneByIdentityProvider(context: Authorization.Context, request: CreateOneUserByIdentityProviderRequest): Promise<boolean>;
    updatePassword(context: Authorization.Context, request: { userId: NanoId; password: string }): Promise<boolean>;
    updateGender(context: Authorization.Context, request: { userId: NanoId; gender: Gender }): Promise<boolean>;
    updateProfilePicture(context: Authorization.Context, request: { userId: NanoId; profilePicture?: ReadStream }): Promise<boolean>;
}

export interface CreateUserServiceInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    emailAdapter: Email.Adapter;
    smsAdapter: SMS.Adapter;
    identityProviderAdapter: IdentityProvider.Adapter;
    serverUrl: string;
    webAppUrl: string;
}

export function createUserService({
    dataSourceAdapter,
    logger,
    emailAdapter,
    smsAdapter,
    identityProviderAdapter,
    serverUrl,
    webAppUrl,
}: CreateUserServiceInput): UserService {
    return {
        findOneByUserId: (context: Authorization.Context, request: FindOneUserByUserIdRequest) =>
            findOneByUserId({ dataSourceAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ dataSourceAdapter, logger, context, request }),
        createOneByEmailAddress: (context: Authorization.Context, request: CreateOneUserByEmailAddressRequest) =>
            createOneByEmailAddress({ dataSourceAdapter, logger, emailAdapter, smsAdapter, serverUrl, webAppUrl, context, request }),
        createOneByPhoneNumber: (context: Authorization.Context, request: CreateOneUserByPhoneNumberRequest) =>
            createOneByPhoneNumber({ dataSourceAdapter, logger, smsAdapter, webAppUrl, context, request }),
        createOneByIdentityProvider: (context: Authorization.Context, request: CreateOneUserByIdentityProviderRequest) =>
            createOneByIdentityProvider({ dataSourceAdapter, logger, identityProviderAdapter, context, request }),
        updatePassword: (context: Authorization.Context, request: { userId: NanoId; password: string }) =>
            updatePassword({ dataSourceAdapter, logger, context, request }),
        updateGender: (context: Authorization.Context, request: { userId: NanoId; gender: Gender }) =>
            updateGender({ dataSourceAdapter, logger, context, request }),
        updateProfilePicture: (context: Authorization.Context, request: { userId: NanoId; profilePicture?: ReadStream }) =>
            updateProfilePicture({ dataSourceAdapter, logger, serverUrl, context, request }),
    };
}
