import type {ServerAPI} from "decky-frontend-lib";

export default class Backend
{
    private static _server: ServerAPI;
    public static get server()
    {
        return this._server;
    }
    
    public static initialize(server: ServerAPI): void
    {
        this._server = server;
    }

    /**
     * Call backend method.
     * 
     * @param name Name of the function
     * @param args Names arguments
     * @returns 
     */
    public static async callMethod(name: string, args: Record<string, any> = {}): Promise<string | {}>
    {
        const output = await this._server?.callPluginMethod(name, args);
        return output.result;
    }
};