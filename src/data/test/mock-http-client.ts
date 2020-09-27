import { HttPostParams, HttpPostClient } from '../models/http-post-client';

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  async post(params: HttPostParams): Promise<void> {
    this.url = params.url;
    return Promise.resolve();
  }
}
