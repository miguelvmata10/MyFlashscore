import NotFound from '../../../CommonUI/NotFound';
import StandingsDescriptions from '../StandingsDescriptions';
import useStandingsDescriptions from '../../../../hooks/utils/useStandingsDescriptions';
import { useResults } from '../../../../providers/ResultsContext';
import TeamStandingsTable from './TeamStandingsTable';
import LeagueStandingsTable from './LeagueStandingsTable';

const StandingsTable = ({ groups, hasStandings, type, teamID = null }) => {
    const results = useResults();
    
    // se tem teamID significa que se trata da tabela classificativa 
    // no menu de estatisticas de clube
    if (teamID) {
        groups = groups.filter((group) => {
            // não faço a comparação por tipo, pois não têm o mesmo tipo
            return group.teams && group.teams.some(team => team.teamID == teamID)
        });
    }

    const { descriptionsByLeague, descriptionColorMap } = useStandingsDescriptions(groups);
    
    // apenas irá mostrar o titulo do grupo, caso haja mais do que 1 grupo na liga
    const isBiggerThanOneGroup = groups.length > 1;

    // se hasStandings === false e se tratar de uma taça, então não quero que sejam mostrado <NotFound />
    // pois serão mostradas as rondas da Taça  
    if (!hasStandings && type === 'Cup') {
        return null;
    }

    // necessário fazer esta verificação, pois se groups é vazio então a verificação não foi feita dentro de <Standings />
    if (!hasStandings && (!groups || groups.length === 0 )) {
        return <NotFound />;
    }

    if (!groups || groups.length === 0) return <NotFound />;
    return (
        <>
            <div>
                {(groups.map((group, groupIndex) => (
                    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }} key={groupIndex}>
                        {isBiggerThanOneGroup && <h6 className='border-start border-danger border-4 ps-2 py-1 bg-transparent bg-opacity-50 rounded-start'>
                            {group.groupName}
                        </h6>}
                        {teamID ? (
                            <TeamStandingsTable group={group} descriptionColorMap={descriptionColorMap} teamID={teamID} results={results} />
                        ) : (
                            <LeagueStandingsTable group={group} descriptionColorMap={descriptionColorMap} />
                        )}
                    </div>
                )))} 
            </div>
            {!teamID && <div>
                <StandingsDescriptions descriptionsByLeague={descriptionsByLeague} descriptionColorMap={descriptionColorMap}/>
            </div>}
        </>
    );
};

export default StandingsTable