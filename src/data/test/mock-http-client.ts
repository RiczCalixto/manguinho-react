import { HttPostParams, HttpPostClient } from '@/data/models/http-post-client';

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  body?: object;

  async post(params: HttPostParams): Promise<void> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve();
  }
}
