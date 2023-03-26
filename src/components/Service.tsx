import {VFC, useState, useEffect} from "react";
import {PanelSectionRow, ButtonItem, Navigation, SteamSpinner} from "decky-frontend-lib";

import GameService from "../lib/game-services/GameService";

const Service: VFC<{service: GameService}> = ({service})=> {
    const [results, setResults] = useState<Game[] | null>(null);

    useEffect(()=>
    {
        service.loadFreeGames()
            .then(games=> setResults(games))
            .catch(console.error);
    }, []);

    return (
        <PanelSectionRow>
            <h4>{service.ServiveName}</h4>
            {results === null && <SteamSpinner />}
            {results?.length === 0 && <p>No games available</p>}

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