import {FaMoneyBill} from "react-icons/fa";
import {definePlugin, ServerAPI, staticClasses} from "decky-frontend-lib";

// Types
import type {VFC} from "react";

// Lib
import Toast from "./lib/Toast";
import Backend from "./lib/Backend";

import GogService from "./lib/game-services/GogService";
import EpicGameService from "./lib/game-services/EpicGameService";

// Components
import Service from "./components/Service";
import NotificationSettings from "./components/NotificationSettings";

const services = [
    new EpicGameService(),
    new GogService()
];

const Content: VFC = ()=>
    <div>
        <NotificationSettings services={services} />
        {services.map((service)=> <Service service={service} />)}
    </div>

export default definePlugin((serverApi: ServerAPI)=> {
    Backend.initialize(serverApi);
    
    Toast.sendToast(services);
    const interval = setInterval(()=> Toast.sendToast(services), 10800000);
    
    return {
        title: <div className={staticClasses.Title}>Free Game Checker</div>,
        content: <Content />,
        icon: <FaMoneyBill />,
        onDismount(){
            clearInterval(interval);
        }
    }
});