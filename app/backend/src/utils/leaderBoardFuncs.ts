import IMatches from '../interfaces/IMatches';
import ILeaderBoard from '../interfaces/ILeaderBoard';

export default class LeaderBoardCreate {
  readonly leaderBoard: ILeaderBoard[];

  constructor(
    private teamNames: string[],
  ) {
    this.leaderBoard = teamNames.map((curr) => ({
      name: curr,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    }));
  }

  private caculateWinHome = ({ homeTeamGoals, awayTeamGoals, ...restofData }: IMatches) => {
    const [homeTeam] = this.leaderBoard.filter((e) => e.name === restofData.homeTeam.teamName);
    if (homeTeamGoals > awayTeamGoals) {
      homeTeam.totalVictories += 1;
      homeTeam.totalPoints += 3;
    } else if (homeTeamGoals < awayTeamGoals) {
      homeTeam.totalLosses += 1;
    } else {
      homeTeam.totalDraws += 1;
      homeTeam.totalPoints += 1;
    }
  };

  private calculateWinAway = ({ homeTeamGoals, awayTeamGoals, ...restofData }: IMatches) => {
    const [awayTeam] = this.leaderBoard.filter((e) => e.name === restofData.awayTeam.teamName);
    if (homeTeamGoals > awayTeamGoals) {
      awayTeam.totalLosses += 1;
    } else if (homeTeamGoals < awayTeamGoals) {
      awayTeam.totalVictories += 1;
      awayTeam.totalPoints += 3;
    } else {
      awayTeam.totalDraws += 1;
      awayTeam.totalPoints += 1;
    }
  };

  private finalCalculation = () => {
    this.teamNames.forEach((elem: string) => {
      const [teamLeadBoard] = this.leaderBoard.filter((e: ILeaderBoard) => e.name === elem);
      const efficencyFloat = ((teamLeadBoard.totalPoints / (teamLeadBoard.totalGames * 3)) * 100)
        .toFixed(2);
      teamLeadBoard.efficiency = parseFloat(efficencyFloat);
      teamLeadBoard.goalsBalance = teamLeadBoard.goalsFavor - teamLeadBoard.goalsOwn;
    });
  };

  private seedHome = (match: IMatches) => {
    const [homeTeam] = this.leaderBoard.filter((e) => e.name === match.homeTeam.teamName);
    const { homeTeamGoals, awayTeamGoals } = match;
    // goals a favor
    homeTeam.goalsFavor += homeTeamGoals;
    // goals tomados
    homeTeam.goalsOwn += awayTeamGoals;
    // jogos feitos
    homeTeam.totalGames += 1;
    this.caculateWinHome(match);
  };

  private seedAway = (match: IMatches) => {
    const [awayTeam] = this.leaderBoard.filter((e) => e.name === match.awayTeam.teamName);
    const { homeTeamGoals, awayTeamGoals } = match;
    // goals a favor
    awayTeam.goalsFavor += awayTeamGoals;
    // goals tomados
    awayTeam.goalsOwn += homeTeamGoals;
    // jogos feitos
    awayTeam.totalGames += 1;
    this.calculateWinAway(match);
  };

  private seedLeaderBoard = (home: boolean, away: boolean, matches: IMatches[]) => {
    matches.forEach((match: IMatches) => {
      if (home) this.seedHome(match);
      if (away) this.seedAway(match);
    });
  };

  private sortTeams = (a: ILeaderBoard, b: ILeaderBoard) => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (a.totalVictories !== b.totalVictories) {
      return b.totalVictories - a.totalVictories;
    }
    if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    if (a.goalsFavor !== b.goalsFavor) {
      return b.goalsFavor - a.goalsFavor;
    }
    return a.goalsOwn - b.goalsOwn;
  };

  public getLeaderBoard = (home: boolean, away: boolean, matches: IMatches[])
  : ILeaderBoard[] => {
    this.seedLeaderBoard(home, away, matches);
    this.finalCalculation();
    this.leaderBoard.sort(this.sortTeams);
    return this.leaderBoard;
  };
}
