import type GameService from "./game-services/GameService";

// Lib
import Backend from "./Backend";
import Settings from "./Settings";
import {slugify} from "./string-helper";

export default class Toast {
    private static _usePerGameNotifications: boolean = false;

    /**
     * Send notifications for free games based on user's settings.
     * 
     * @param services List of available services
     */
    public static async sendToast(services: GameService[]): Promise<void> {
        try {this._usePerGameNotifications = await Settings.getSetting("per-game-notifications", false);}
        catch(error) {return Backend.log("Failed to load setting. Canceling notifications...", error);}
    
        services.forEach(async (service: GameService)=> await this._handleServiceNotifications(service));
    }

    /**
     * Get the notifications status for the given service.
     * 
     * @param service The service
     * @returns True if the notifications are enabled for this service.
     */
    private static async _getServiceNotificationStatus(service: GameService): Promise<boolean> {
        try {return await Settings.getSetting(slugify(service.ServiveName), false);}
        catch(error) {
            Backend.log(`Failed to load notification settings for service "${service.ServiveName}"`, error);
            return false;
        }
    }

    /**
     * Get a list of games that have not yet sent a notification
     * 
     * @param service The service
     * @returns List of games
     */
    private static async _getUnsentToasts(service: GameService): Promise<Game[]> {
        let games: Game[];
        try {games = await service.loadFreeGames();}
        catch(error) {
            Backend.log(`Failed to load games for service "${service.ServiveName}"`, error);
            games = [];
        };

        const response: Game[] = [];
        for (let i = 0; i < games.length; i++) {
            const gameSlug = `${slugify(service.ServiveName)}-${slugify(games[i].name)}`;

            let isSent: boolean;
            try {isSent = await Settings.getSetting(gameSlug, false);}
            catch(error) {isSent = false;}

            if (!isSent)
                response.push(games[i]);
        }

        return response;
    };

    /**
     * Send a notification for each game in the service.
     * 
     * @param service The service
     * @param games The games
     */
    private static async _sendIndividualGameNotifications(service: GameService, games: Game[]): Promise<void> {
        for (let i = 0; i < games.length; i++) {
            const game = games[i];
            try {await Settings.setSetting(`${slugify(service.ServiveName)}-${slugify(game.name)}`, true);}
            catch(error) {Backend.log("Failed to update notification sent setting for game", error);}
            Backend.showToast(`New game available for ${service.ServiveName}:`, game.name)
        }
    };

    /**
     * Send a notification once for all the games.
     * 
     * @param service The service
     * @param games The games
     */
    private static async _sendServiceNotification(service: GameService, games: Game[]): Promise<void> {
        let hasSentNotification = false;

        for (let i = 0; i < games.length; i++) {
            const game = games[i];
            try {await Settings.setSetting(`${slugify(service.ServiveName)}-${slugify(game.name)}`, true);}
            catch(error) {Backend.log(`Failed to update notification sent setting for service "${service.ServiveName}"`, error);}

            if (!hasSentNotification) {
                Backend.showToast(`New games available for ${service.ServiveName}:`, "Check out the plugin to see which games are free");
                hasSentNotification = true;
            }
        }
    }

    /**
     * Collect the games and send the notification.
     * 
     * @param service The service
     */
    private static async _handleServiceNotifications(service: GameService): Promise<void> {
        const serviceEnabled: boolean = await this._getServiceNotificationStatus(service);
        if (!serviceEnabled)
            return;
        
        let newGames: Game[];
        try {newGames = await this._getUnsentToasts(service);}
        catch(error) {return Backend.log(`Failed to get game notification settings for "${service.ServiveName}"`, error);}

        if (this._usePerGameNotifications)
            await this._sendIndividualGameNotifications(service, newGames);
        else
            await this._sendServiceNotification(service, newGames);
    }
};