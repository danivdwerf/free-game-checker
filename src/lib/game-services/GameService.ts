import { ServerAPI } from "decky-frontend-lib";

export default abstract class GameService
{
    protected abstract _serviceName: string;
    public get ServiveName(): string
    {
        return this._serviceName;
    }

    protected _serverAPI: ServerAPI;
    constructor(serverAPI: ServerAPI)
    {
        this._serverAPI = serverAPI;
    }

    public abstract loadFreeGames(): Promise<Game[]>;
};