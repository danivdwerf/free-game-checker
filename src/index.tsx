import {VFC} from "react";
import {FaShip} from "react-icons/fa";
import {definePlugin, PanelSection, ServerAPI, staticClasses} from "decky-frontend-lib";

// Lib
import Backend from "./lib/Backend";
import EpicGameService from "./lib/game-services/EpicGameService";

// Components
import Service from "./components/Service";

const Content: VFC = ()=> {
    const services = [
        new EpicGameService()
    ];

    return (
        <PanelSection>
            {services.map((service)=> <Service service={service} />)}
        </PanelSection>
    );
};

export default definePlugin((serverApi: ServerAPI)=> {
    Backend.initialize(serverApi);
    
    return {
        title: <div className={staticClasses.Title}>Free Game Checker</div>,
        content: <Content />,
        icon: <FaShip />
    }
});