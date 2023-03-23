import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  private internalServerError = 'Internal server error';
  constructor(private service: MatchesService = new MatchesService()) {
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const { inProgress } = req.query;
      if (inProgress) {
        if (inProgress !== 'true' && inProgress !== 'false') {
          return res.status(400).json({ message: 'inProgress must be "true" or "false"' });
        }
        const matchesByProg = await this.service.getMatchesByProg(inProgress);
        return res.status(200).json(matchesByProg);
      }
      const matches = await this.service.getMatches();
      return res.status(200).json(matches);
    } catch (e) {
      return res.status(500).json({ message: this.internalServerError });
    }
  };

  public finishMatche = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.service.finishMatch(id);
      return res.status(200).json({ message: 'Finished' });
    } catch (e) {
      return res.status(500).json({ message: this.internalServerError });
    }
  };

  public updateMatch = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      console.log(typeof id, id);
      const matchExists = await this.service.getMatchById(id);
      if (!matchExists) return res.status(404).json({ message: 'Match not found' });
      const matchGoals = req.body;
      await this.service.updateMatch(id, matchGoals);
      return res.status(200).json(matchGoals);
    } catch (e) {
      return res.status(500).json({ message: this.internalServerError });
    }
  };
}
