export type HttPostParams = {
  url: string;
  body?: any;
  header?: any;
};

export interface HttpPostClient {
  post: (params: HttPostParams) => Promise<void>;
}
