import TeamModel from '../database/models/TeamsModel';

export default class TeamService {
  constructor(private teamModel = TeamModel) { }
  public getAllTeams = (): Promise<TeamModel[]> => this.teamModel.findAll()
    .then((data) => data.map((e) => e.dataValues));
}

const teste = async () => {
  const team = new TeamService();
  console.log(await team.getAllTeams());
};

teste();
