import {VFC, useState, useEffect} from "react";
import {PanelSection, PanelSectionRow, ButtonItem, Navigation, SteamSpinner} from "decky-frontend-lib";

// Types
import type GameService from "../lib/game-services/GameService";

// Lib
import Backend from "../lib/Backend";

const Service: VFC<{service: GameService}> = ({service})=> {
    const [results, setResults] = useState<Game[] | null>(null);

    const onMounted = ()=>
    {
        service.loadFreeGames()
            .then(setResults)
            .catch(error=> Backend.log(`Failed to load games for service "${service.ServiveName}"`, error));
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