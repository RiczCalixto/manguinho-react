import { HttPostParams, HttpPostClient, HttpResponse, HttpStatusCode } from '@/data/models';

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string;
  body?: T;
  response?: HttpResponse<R> = { statusCode: HttpStatusCode.success };

  async post(params: HttPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}
