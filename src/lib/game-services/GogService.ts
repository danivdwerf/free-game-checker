import Backend from "../Backend";
import GameService from "./GameService";

export default class GogService extends GameService {
    protected override _serviceName: string = "GOG.com";
    private _apiURL: string = "https://catalog.gog.com/v1/catalog";

    private async _loadData(): Promise<GOGResponse> {
        const params = new URLSearchParams({
            price: "between:0,0",
            order: "desc:trending",
            discounted: "eq:true",
            productType: "in:game,pack",
            page: "1",
            countryCode: "NL",
            locale: "en-US",
            currencyCode: "EUR",
        });

        const response = await Backend.server.fetchNoCors(`${this._apiURL}?${params}`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        });

        return JSON.parse((response.result as any).body);
    }

    private _transformData(data: GOGResponse): Game[] {
        return data.products.map(item=> {
            return {
                name: item.title,
                page: `https://www.gog.com/en/game/${item.slug}`
            };
        });
    }

    public override async loadFreeGames(): Promise<Game[]>
    {
        let response;
        try {response = await this._loadData();}
        catch (error) {
            Backend.callMethod("log", {message: `Failed to load GOG api: ${error}`});
            return [];
        }

        return this._transformData(response);
    }
};