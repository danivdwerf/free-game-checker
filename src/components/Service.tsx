import {VFC, useState, useEffect} from "react";
import {PanelSection, PanelSectionRow, ButtonItem, Navigation, SteamSpinner} from "decky-frontend-lib";

import GameService from "../lib/game-services/GameService";

const Service: VFC<{service: GameService}> = ({service})=> {
    const [results, setResults] = useState<Game[] | null>(null);

    const onMounted = ()=>
    {
        service.loadFreeGames()
            .then(setResults)
            .catch(console.error);
    };

    useEffect(onMounted, []);

    return (
        <PanelSection title={service.ServiveName}>
            {/* Results are still loading */}
            {results === null && <SteamSpinner />}

            {/* Empty array means no results */}
            {results?.length === 0 && <p>No items available</p>}

            {
                // Show results
                !!results?.length && results.length > 0 && 
                results?.map(result=>
                    <PanelSectionRow>
                        <ButtonItem layout="below" onClick={()=> Navigation.NavigateToExternalWeb(result.page)}>
                            {result.name}
                        </ButtonItem>
                    </PanelSectionRow>
                )
            }
        </PanelSection>
    );
};

export default Service;