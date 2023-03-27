import MatchesService from './matches.service';
import TeamService from './team.service';
import LeaderBoardCreate from '../utils/leaderBoardFuncs';
import TeamsModel from '../database/models/TeamsModel';

export default class LeaderboardService {
  constructor(
    private _matchesService: MatchesService = new MatchesService(),
    private _teamsService: TeamService = new TeamService(),
  ) {
  }

  public getLeaderboardHome = async (home: boolean, away: boolean) => {
    const teams = await this._teamsService.getAllTeams()
      .then((teamsTable: TeamsModel[]) => teamsTable.map((team: TeamsModel) => team.teamName));
    const leaderBoardCreation = new LeaderBoardCreate(teams);
    const matches = await this._matchesService.getMatchesByProg('false');
    return leaderBoardCreation.getLeaderBoard(home, away, matches);
  };
}
