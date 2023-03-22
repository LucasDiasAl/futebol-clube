import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(private service: MatchesService = new MatchesService()) {
  }

  public getAll = async (_req: Request, res: Response) => {
    try {
      const matches = await this.service.getMatches();
      return res.status(200).json(matches);
    } catch (e) {
      return res.status(200).json({ message: 'Internal server error' });
    }
  };
}
