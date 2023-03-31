import GameService from "./GameService";

export default class AmazonGameService extends GameService {
    protected override _serviceName: string = "Amazon Prime";

    public override async loadFreeGames(): Promise<Game[]> {
        return [];
    }
};