import {FaMoneyBill} from "react-icons/fa";
import {definePlugin, PanelSection, ServerAPI, staticClasses} from "decky-frontend-lib";

// Types
import type {VFC} from "react";
import type GameService from "./lib/game-services/GameService";

// Lib
import Backend from "./lib/Backend";
import {slugify} from "./lib/string-helper";
import EpicGameService from "./lib/game-services/EpicGameService";

// Components
import Settings from "./lib/Settings";
import Service from "./components/Service";

const services = [
    new EpicGameService()
];

const sendToast = ()=>
{
    services.forEach(async (service: GameService)=>
    {
        const serviceSlug = slugify(service.ServiveName);
        if (!await Settings.getSetting(serviceSlug, false))
            return;

        const games = await service.loadFreeGames();
        games.forEach(async (game: Game)=>
        {
            const gameSlug = `${serviceSlug}-${slugify(game.name)}`;

            // Already sent
            if (await Settings.getSetting(gameSlug, false))
                return;

            await Settings.setSetting(gameSlug, true);
            Backend.showToast(`New Game available for ${service.ServiveName}`, game.name)
        });
    });
};

const Content: VFC = ()=>
    <PanelSection>
        {services.map((service)=> <Service service={service} />)}
    </PanelSection>

export default definePlugin((serverApi: ServerAPI)=> {
    Backend.initialize(serverApi);
    
    sendToast();
    const interval = setInterval(sendToast, 3600000);
    
    return {
        title: <div className={staticClasses.Title}>Free Game Checker</div>,
        content: <Content />,
        icon: <FaMoneyBill />,
        onDismount(){
            clearInterval(interval);
        }
    }
});