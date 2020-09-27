import { HttpPostClient } from '@/data/models/http-post-client';
import { HttpStatusCode } from '@/data/models/http-response';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { UnexpectedError } from '@/domain/errors/unexpected.error.ts';
import { AuthenticationParams } from '@/domain/usecases/authentication';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
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
  }
}
