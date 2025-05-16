import { QueryChainsReq, SkipChainJson, QueryTokensReq, SkipTokenJson, SimpleMap } from "../constants";

const Paths: SimpleMap<string> = {
  ChainList: "info/chains",
  TokenList: "fungible/assets",
};

export class SkipClient {
  readonly url: string = "https://api.skip.build/v2";

  constructor() { }

  public async ChainsList(req: QueryChainsReq): Promise<SkipChainJson[]> {
    const queryUrl = getReqUrl(this.url, Paths.ChainList, req as BaseRequest);
    const response = await fetch(queryUrl);
    const json = await response.json();
    return json.chains as SkipChainJson[];
  }

  public async TokensList(req: QueryTokensReq): Promise<SimpleMap<{ assets: SkipTokenJson[] }>> {
    const queryUrl = getReqUrl(this.url, Paths.TokenList, req as BaseRequest);
    const response = await fetch(queryUrl);
    const json = await response.json();
    return json.chain_to_assets_map as SimpleMap<{ assets: SkipTokenJson[] }>;
  }
}

type RequestValue = string | boolean;
type BaseRequest = SimpleMap<RequestValue>;

const getReqUrl = (domain: string, path: string, req: BaseRequest): string => {
  let queryUrl = `${domain}/${path}`;
  if (Object.keys(req).length > 0) {
    const queryStrArr = Object.entries(req).map(([key, value]: [string, RequestValue]) => {
      return `${key}=${value}`;
    });
    queryUrl = `${queryUrl}?${queryStrArr.join("&")}`;
  }
  return queryUrl;
};