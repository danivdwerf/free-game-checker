import Backend from "../Backend";
import GameService from "./GameService";

export default class EpicGameService extends GameService {
    protected override _serviceName: string = "Epic Games Store";

    private _apiURL: string = "https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions";

    private async _loadData(): Promise<EpicGamesResponse> {
        const fetchResponse = await Backend.server.fetchNoCors(this._apiURL, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        });

        return JSON.parse((fetchResponse.result as any).body);
    };

    private _transformData(data: EpicGamesResponse): Game[] {
        const now = new Date();
        const elements = data?.data?.Catalog?.searchStore?.elements ?? [];
        return elements
            .filter(game=> {
                // Filter out non-free games
                if (game.price.totalPrice.originalPrice !== game.price.totalPrice.discount)
                    return false;

                // Filter out previous or upcoming items
                return !!game.promotions?.promotionalOffers.find(promotion=> {
                    return !!promotion.promotionalOffers.find(tmp=> {
                        const start = new Date(tmp.startDate);
                        const end = new Date(tmp.endDate);
                        return now >= start && now <= end;
                    })
                });
            })
            .map(game=> {
                const slug = game.catalogNs.mappings.find(mapping=> mapping.pageType === "productHome")?.pageSlug ?? "";

                return {
                    name: game.title,
                    page: `https://store.epicgames.com/en-US/p/${slug}`
                };
            });
    }

    public override async loadFreeGames(): Promise<Game[]> {
        let response: EpicGamesResponse;
        try {response = await this._loadData();}
        catch(error) {
            Backend.callMethod("log", {message: `Failed to load Epic Games api: ${error}`});
            return [];
        }
    
        try {return this._transformData(response);}
        catch (error) {
            Backend.callMethod("log", {message: `Failed to transform Epic Games response: ${error}`});
            return [];
        }
    }
};