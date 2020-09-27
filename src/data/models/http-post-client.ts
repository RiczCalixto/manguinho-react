import { HttpResponse } from './http-response';

export type HttPostParams<T> = {
  url: string;
  body?: T;
  header?: any;
};

export interface HttpPostClient<T, R> {
  post: (params: HttPostParams<T>) => Promise<HttpResponse<R>>;
}
