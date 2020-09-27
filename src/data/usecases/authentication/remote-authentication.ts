import { HttpPostClient, HttpStatusCode } from '@/data/models';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models/account.model';
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication';

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    });

    const unexpectedError =
      httpResponse.statusCode === HttpStatusCode.serverError ||
      httpResponse.statusCode === HttpStatusCode.badRequest ||
      httpResponse.statusCode === HttpStatusCode.notFound;

    if (httpResponse.statusCode === HttpStatusCode.unathorized) {
      throw new InvalidCredentialsError();
    }
    if (unexpectedError) {
      throw new UnexpectedError();
    }

    return httpResponse.body;
  }
}
