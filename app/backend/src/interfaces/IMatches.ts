type IMatches = {
  dataValues: {
    id: number,
    homeTeamId: number,
    homeTeamGoals: number,
    awayTeamId: number,
    awayTeamGoals: number,
    inProgress: boolean,
    homeTeam: { dataValues: { teamName: string } },
    awayTeam: { dataValues: { teamName: string } }
  }
};
export default IMatches;
