declare module 'bert-as-service' {
    export class BertClient {
      constructor(bertUrl: string, port?: number, portOut?: number);
      encode(texts: string[]): Promise<number[][]>;
      encodeAsync(texts: string[]): Promise<number[][]>;
      encodeSync(texts: string[]): number[][];
    }
  }
  