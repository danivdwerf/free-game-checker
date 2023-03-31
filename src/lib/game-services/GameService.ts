export default abstract class GameService
{
    protected abstract _serviceName: string;
    public get ServiveName(): string
    {
        return this._serviceName;
    }

    public abstract loadFreeGames(): Promise<Game[]>;
};