import TeamModel from '../database/models/TeamsModel';

export default class TeamService {
  constructor(private teamModel = TeamModel) {}
  public getAllTeams(): Promise<TeamModel[]> {
    return this.teamModel.findAll()
      .then((data) => data.map((e) => e.dataValues));
  }
}
