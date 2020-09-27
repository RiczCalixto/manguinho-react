import { HttpResponse } from './http-response';

export type HttPostParams = {
  url: string;
  body?: object;
  header?: any;
};

export interface HttpPostClient {
  post: (params: HttPostParams) => Promise<HttpResponse>;
}
