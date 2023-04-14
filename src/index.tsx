import {FaMoneyBill} from "react-icons/fa";
import {definePlugin, ServerAPI, staticClasses} from "decky-frontend-lib";

// Types
import type {VFC} from "react";
import type GameService from "./lib/game-services/GameService";

// Lib
import Backend from "./lib/Backend";
import {slugify} from "./lib/string-helper";
import GogService from "./lib/game-services/GogService";
import EpicGameService from "./lib/game-services/EpicGameService";

// Components
import Settings from "./lib/Settings";
import Service from "./components/Service";
import NotificationSettings from "./components/NotificationSettings";

const services = [
    new EpicGameService(),
    new GogService()
];

const getUnsentToasts = async (service: GameService)=> {
    const games = await service.loadFreeGames();
    return games.filter(async (game: Game)=> {
        const gameSlug = `${slugify(service.ServiveName)}-${slugify(game.name)}`;
        if (await Settings.getSetting(gameSlug, false))
            return false;

        return true;
    });
};

const sendToast = async ()=> {
    let perGameNotifications: boolean;
    try {perGameNotifications = await Settings.getSetting("per-game-notifications", false);}
    catch(error) {return Backend.log("Failed to load setting. Canceling notifications...", error);}

    services.forEach(async (service: GameService)=>
    {
        let serviceEnabled: boolean;
        try {serviceEnabled = await Settings.getSetting(slugify(service.ServiveName), false);}
        catch(error) {
            serviceEnabled = false;
            Backend.log(`Failed to load notification settings for service "${service.ServiveName}"`, error);
        }

        if (!serviceEnabled)
            return;
        
        let newGames: Game[];
        try {newGames = await getUnsentToasts(service);}
        catch(error) {return Backend.log(`Failed to get game notification settings for "${service.ServiveName}"`, error);}

        if (perGameNotifications) {
            newGames.forEach(async (game: Game)=> {
                await Settings.setSetting(`${slugify(service.ServiveName)}-${slugify(game.name)}`, true);
                Backend.showToast(`New game available for ${service.ServiveName}:`, game.name)
            });
        }
        else {
            let hasSentNotification = false;
            newGames.forEach(async (game: Game)=> {
                await Settings.setSetting(`${slugify(service.ServiveName)}-${slugify(game.name)}`, true);

                if (!hasSentNotification) {
                    Backend.showToast(`New games available for ${service.ServiveName}:`, "Click here to see which games are free");
                    hasSentNotification = true;
                }
            });
        }
    });
};

const Content: VFC = ()=>
    <div>
        <NotificationSettings services={services} />
        {services.map((service)=> <Service service={service} />)}
    </div>

export default definePlugin((serverApi: ServerAPI)=> {
    Backend.initialize(serverApi);
    
    sendToast();
    // check if notifications should be send each 3 hours (3 * 60 * 60 * 1000)
    const interval = setInterval(sendToast, 10800000);
    
    return {
        title: <div className={staticClasses.Title}>Free Game Checker</div>,
        content: <Content />,
        icon: <FaMoneyBill />,
        onDismount(){
            clearInterval(interval);
        }
    }
});