import GameService from "./GameService";

interface EpicGamesItem {
    title: string;
    id: string;
    namespace: string;
    description: string;
    effectiveDate: string;
    offerType: string;
    expiryDate: string;
    status: string;
    isCodeRedemptionOnly: boolean;
    keyImages: {
        type: string;
        url: string;
    }[];
    seller: {
        id: string;
        name: string;
    };
    productSlug?: string;
    urlSlug: string;
    url?: string;
    items: {
        id: string;
        namespace: string;
    }[];
    customAttributes: {
        key: string;
        value: string;
    }[];
    categories: {
        path: string;
    }[];
    tags: {
        id: string;
    }[];
    catalogNs: {
        mappings: {
            pageSlug: string;
            pageType: string;
        }[];
    };
    offerMappings: {
        pageSlug: string;
        pageType: string;
    }[];
    price: {
        totalPrice: {
            discountPrice: number;
            originalPrice: number;
            voucherDiscount: number;
            discount: number;
            currencyCode: string;
            currencyInfo: {
                decimals: number;
            };
            fmtPrice: {
                originalPrice: string;
                discountPrice: string;
                intermediatePrice: string;
            };
        };
        lineOffers: {
            appliedRules: {
                id: string;
                endDate: string;
                discountSetting: {
                    discountType: string;
                };
            }[];
        }[];
    };
    promotions: {
        promotionalOffers: {
            promotionalOffers: {
                startDate: string;
                endDate: string;
            }[];
        }[];
        upcomingPromotionalOffers: {
            promotionalOffers: {
                startDate: string;
                endDate: string;
                discountSetting: {
                    discountType: string;
                    discountPercentage: number;
                };
            }[];
        }[];
    };
};

interface EpicGamesResponse {
    data: {
        Catalog: {
            searchStore: {
                elements: EpicGamesItem[];
            };

            paging: {
                count: number;
                total: number;
            };
        };
    };

    extensions: {

    };
};

export default class EpicGameService extends GameService {
    protected override _serviceName: string = "Epic Games Store";

    private _apiURL: string = "https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions";

    private async _loadData(): Promise<EpicGamesResponse> {
        const fetchResponse = await this._serverAPI!.fetchNoCors(this._apiURL, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        });

        return JSON.parse((fetchResponse.result as any).body);
    };

    public override async loadFreeGames(): Promise<Game[]> {
        let response: EpicGamesResponse;
        try {response = await this._loadData()}
        catch(error){
            this._serverAPI!.callPluginMethod("log", {message: `Failed to load Epic Games api: ${error}`});
            return [];
        }

        const elements = response?.data?.Catalog?.searchStore?.elements ?? [];
        
        const now = new Date();
        return elements
            .filter(game=> {
                if (!game.promotions?.promotionalOffers || game.promotions?.promotionalOffers.length === 0)
                    return false;

                const currentOffer = game.promotions.promotionalOffers.find(promotion=> {
                    return !!promotion.promotionalOffers.find(tmp=> {
                        const start = new Date(tmp.startDate);
                        const end = new Date(tmp.endDate);
                        return now >= start && now <= end;
                    })
                });

                if (!currentOffer)
                    return false;
                
                return true;
            })
            .map(game=> {
                const slug = game.catalogNs.mappings.find(mapping=> mapping.pageType === "productHome")?.pageSlug ?? "";

                return {
                    name: game.title,
                    page: `https://store.epicgames.com/en-US/p/${slug}`
                };
            }) ?? [];
    }
}