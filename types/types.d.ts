declare module "*.svg" {
    const content: string;
    export default content;
}

declare module "*.png" {
    const content: string;
    export default content;
}

declare module "*.jpg" {
    const content: string;
    export default content;
}

declare interface Game {
    name: string;
    page: string;
};

declare interface EpicGamesItem {
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

declare interface EpicGamesResponse {
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

declare interface GOGMeta {
    name: string;
    slug: string
};


declare interface GOGItem {
    id: string;
    slug: string;
    features: GOGMeta[];
    screenshots: string[];
    userPreferredLanguage: {
        code: string;
        inAudio: boolean;
        inText: boolean;
    };
    releaseDate: string;
    productType: string;
    title: string;
    coverHorizontal: string;
    coverVertical: string;
    developers: string[];
    publishers: string[];
    operatingSystems: string[];
    price: {
        final: string;
        base: string;
        discount: string;
        finalMoney: {
            amount: string;
            currency: string;
        };
        baseMoney: {
            amount: string;
            currency: string;
        };
    };
    productState: string;
    genres: GOGMeta[];
    tags: GOGMeta[];
    reviewsRating: number;
};

declare interface GOGResponse {
    pages: number;
    productCount: number;
    products: GOGItem[];
    filters: {
        releaseDateRange: {
            min: number; 
            max: number;
        };
        priceRange: {
            min: number; 
            max: number;
            currency: string; 
            decimalPlaces: number;
        }
        genres: GOGMeta[];
        languages: GOGMeta[];
        systems: GOGMeta[];
        tags: GOGMeta[];
        discounted: boolean;
        features: GOGMeta[];
        releaseStatuses: GOGMeta[];
        types: string[];
        fullGenresList: GOGMeta[];
        fullTagsList: GOGMeta[];
    };
};