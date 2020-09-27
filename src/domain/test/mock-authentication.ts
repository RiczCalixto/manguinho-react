import { AuthenticationParams } from '@/domain/usecases/authentication';
import faker from 'faker';

export const MOCKAuthenticationFactory = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
});
