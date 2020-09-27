import { AuthenticationParams } from '@/domain/usecases/authentication';
import faker from 'faker';
import { AccountModel } from '../models/account.model';

export const MOCKAuthenticationFactory = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
});

export const MOCKAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid()
});
