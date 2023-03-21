import { Response, Request } from 'express';
import TeamService from '../services/team.service';
import TeamTable from '../interfaces/TeamTableInterface';

export default class TeamController {
  private service: TeamService;

  constructor() {
    this.service = new TeamService();
  }

  public getAll = async (_req: Request, res: Response) => {
    try {
      const teams: TeamTable[] = await this.service.getAllTeams();
      if (Array.isArray(teams) && teams.length === 0) {
        return res.status(500).json({ message: 'Teams not found' });
      }
      return res.status(200).json(teams);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };

  public getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      console.log(req);
      const team: TeamTable | null = await this.service.getTeamById(Number(id));
      if (team) return res.status(200).json(team);
      return res.status(404).json({ message: 'Team not found' });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };
}
