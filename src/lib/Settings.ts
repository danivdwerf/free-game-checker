import Backend from "./Backend";

export default class Settings
{
    /**
     * Get a settings from the settings file.
     * 
     * @param key Name of the setting
     * @param defaultValue Default value to return if setting doesn't exist
     * @returns 
     */
    static async getSetting<T>(key: string, defaultValue: T): Promise<string | {}>
    {
        return await Backend.callMethod("getSetting", {
            key: key,
            defaults: defaultValue
        });
    }

    /**
     * Store a value as key in the configuration.
     * 
     * @param key Name of the setting
     * @param value Value to store
     */
    static async setSetting(key: string, value: any): Promise<void>
    {
        await Backend.callMethod("setSetting", {
            key: key,
            value: value
        });
    }
};