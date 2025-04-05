import { useMemo } from "react";
import { generateColors } from "../../utils/helpers";

const useStandingsDescriptions = (groups) => {
    
    const descriptionsByLeague = useMemo(() => {
        if (!groups) return [];
        
        // set remove duplicados, por isso é mais rápido e eficiente
        const descriptions = new Set();

        groups.forEach(group => {
            group.teams.forEach((team) => {
                if (team.teamStandingDescription) {
                    descriptions.add(team.teamStandingDescription);
                }
            })
        });

        return Array.from(descriptions);
    
    }, [groups]);

    const descriptionColorMap = useMemo(() => {
        const colors = generateColors(descriptionsByLeague.length);
        return descriptionsByLeague.reduce((acc, description, index) => {
            acc[description] = colors[index];
            return acc;
        }, {});
    }, [descriptionsByLeague]);

    return { descriptionsByLeague, descriptionColorMap };
}
export default useStandingsDescriptions