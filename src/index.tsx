import {VFC} from "react";
import {FaShip} from "react-icons/fa";
import {definePlugin, PanelSection, ServerAPI, staticClasses} from "decky-frontend-lib";

// Lib
import EpicGameService from "./lib/game-services/EpicGameService";

// Components
import Service from "./components/Service";

const Content: VFC<{serverAPI: ServerAPI}> = ({serverAPI})=> {
    const services = [
        new EpicGameService(serverAPI)
    ];

    return (
        <PanelSection>
            {services.map((service)=> <Service service={service} />)}
        </PanelSection>
    );
};

export default definePlugin((serverApi: ServerAPI)=> ({
    title: <div className={staticClasses.Title}>Free Game Checker</div>,
    content: <Content serverAPI={serverApi} />,
    icon: <FaShip />
}));