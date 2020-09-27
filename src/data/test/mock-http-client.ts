import { HttPostParams, HttpPostClient } from '@/data/models/http-post-client';
import { HttpResponse, HttpStatusCode } from '../models/http-response';

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  body?: object;
  response?: HttpResponse = { statusCode: HttpStatusCode.success };

  async post(params: HttPostParams): Promise<HttpResponse> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}
