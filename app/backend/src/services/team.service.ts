import TeamModel from '../database/models/TeamsModel';

export default class TeamService {
  constructor(private teamModel = TeamModel) { }
  public getAllTeams = (): Promise<TeamModel[]> => this.teamModel.findAll()
    .then((data: TeamModel[]) => data.map((e: TeamModel) => e.dataValues));

  public getTeamById = async (id:number): Promise<TeamModel | null> => {
    const result = await this.teamModel.findByPk(id);
    return result?.dataValues || null;
  };
}

// const teste = async () => {
//   const team = new TeamService();
//   console.log(await team.getTeamById(999));
// };
//
// teste();
