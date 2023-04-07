import {VFC, useState, useEffect} from "react";
import {PanelSectionRow, ButtonItem, Navigation, SteamSpinner, Toggle} from "decky-frontend-lib";

// Lib
import Backend from "../lib/Backend";
import Settings from "../lib/Settings";
import {slugify} from "../lib/string-helper";
import GameService from "../lib/game-services/GameService";

const Service: VFC<{service: GameService}> = ({service})=> {
    const [results, setResults] = useState<Game[] | null>(null);
    const [useNotifications, setNotifications] = useState<boolean | null>(null);

    const onResults = (games: Game[]): void=>
        setResults(games);

    const onSettings = (results: boolean)=>
        Settings.setSetting(slugify(service.ServiveName), results).then(()=> setNotifications(results));

    const onSettingsChanges = (): void=> 
    {
        if (useNotifications === null)
            return;
        
        Settings.setSetting(slugify(service.ServiveName), useNotifications);
    };

    const onMounted = ()=>
    {
        service.loadFreeGames()
            .then(onResults)
            .catch(console.error);

        Settings.getSetting(slugify(service.ServiveName), false)
            .then(onSettings)
            .catch(error=> Backend.callMethod("log", {message: `Failed to load setting ${error}`}));
    };

    useEffect(onMounted, []);
    useEffect(onSettingsChanges, [useNotifications]);

    return (
        <PanelSectionRow>
            <h4>{service.ServiveName}</h4>
            {
                useNotifications !== null && 
                <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                    <p>Show notifications for this service:</p>
                    <Toggle value={useNotifications} onChange={value=> setNotifications(value)} />
                </div>
            }

            {results === null && <SteamSpinner />}
            {results?.length === 0 && <p>No items available</p>}

            {
                !!results?.length &&
                results.length > 0 && 
                results?.map(result=>
                    <ButtonItem layout="below" bottomSeparator="none" onClick={()=> Navigation.NavigateToExternalWeb(result.page)}>
                        {result.name}
                    </ButtonItem>
                )
            }
        </PanelSectionRow>
    );
};

export default Service;