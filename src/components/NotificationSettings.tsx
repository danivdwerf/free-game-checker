import {VFC, useState, useEffect} from "react";
import {PanelSection, PanelSectionRow, ToggleField} from "decky-frontend-lib";

// Types
import type GameService from "../lib/game-services/GameService";

// Lib
import Backend from "../lib/Backend";
import Settings from "../lib/Settings";
import {slugify} from "../lib/string-helper";

interface ServiceSetting {
    label: string;
    enabled: boolean;
};

const NotificationSettings: VFC<{services: GameService[]}> = ({services})=> {
    const [perGameSettings, setPerGameSettings] = useState<null | boolean>(null);
    const [serviceSettings, setServiceSettings] = useState<Record<string, ServiceSetting>>({});

    /**
     * Load initial values for all notification settings
     */
    const loadSettings = async ()=> {
        let tmp: boolean = false;
        try {tmp = await Settings.getSetting("per-game-notifications", false);}
        catch(error) {Backend.log("Failed to load notification setting:", error);}
        setPerGameSettings(tmp);

        const tmpServiceSettings: Record<string, ServiceSetting> = {};
        for (let i = 0; i < services.length; i++) {
            let isEnabled = false;
            const name = slugify(services[i].ServiveName);
            try {isEnabled = await Settings.getSetting(name, false);}
            catch(error) {Backend.log(`Failed to load notification setting for service "${services[i].ServiveName}":`, error);}
            tmpServiceSettings[name] = {
                enabled: isEnabled,
                label: services[i].ServiveName 
            };
        }

        setServiceSettings(tmpServiceSettings);
    };

    /**
     * Update the notification status for a service.
     * 
     * @param service Service slug
     * @param enabled Enabled status
     */
    const updateServiceSetting = async (service: string, enabled: boolean)=> {
        const clone: Record<string, ServiceSetting> = JSON.parse(JSON.stringify(serviceSettings));
        clone[service].enabled = enabled;
        setServiceSettings(clone);

        try {await Settings.setSetting(service, enabled);}
        catch(error){Backend.log(`Failed to update notification setting for service "${service}"`, error)}
    };

    /**
     * Update the per game notification status
     * 
     * @param enabled Enabled status
     */
    const updatePerGameSetting = async (enabled: boolean)=> {
        setPerGameSettings(enabled);

        try {await Settings.setSetting("per-game-notifications", enabled);}
        catch(error){Backend.log("Failed to update notification setting", error)}
    };

    const onMounted = ()=> {
        loadSettings();
    };

    useEffect(onMounted, []);

    return (
        <PanelSection title="Settings">
            {
                perGameSettings !== null &&
                <PanelSectionRow>
                    <ToggleField 
                        label="Use per game notifications"
                        description="If enabled, the plugin will show a notification for each individual game that is free. Otherwise a single notification will be sent per gaming service"
                        checked={perGameSettings}
                        onChange={updatePerGameSetting}
                    />
                </PanelSectionRow>
            }

            {
                Object.keys(serviceSettings).map((service: string, i: number)=>
                    <PanelSectionRow key={`service-setting-${i}`}>
                        <ToggleField 
                            label={serviceSettings[service].label}
                            checked={serviceSettings[service].enabled}
                            onChange={value=> updateServiceSetting(service, value)}
                        />
                    </PanelSectionRow>
                )
            }
        </PanelSection>
    );
};

export default NotificationSettings;