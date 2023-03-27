import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderBoardController {
  private internalError = 'Internal error';

  constructor(private leaderBoardService: LeaderboardService = new LeaderboardService()) {
  }

  public getHomeGames = async (_req: Request, res: Response) => {
    try {
      const leaderB = await this.leaderBoardService.getLeaderboardHome(true, false);
      return res.status(200).json(leaderB);
    } catch (e) {
      return res.status(200).json({ message: this.internalError });
    }
  };

  public getAwayGames = async (_req: Request, res: Response) => {
    try {
      const leaderB = await this.leaderBoardService.getLeaderboardHome(false, true);
      return res.status(200).json(leaderB);
    } catch (e) {
      return res.status(200).json({ message: this.internalError });
    }
  };

  public getAllGames = async (_req: Request, res: Response) => {
    try {
      const leaderB = await this.leaderBoardService.getLeaderboardHome(true, true);
      return res.status(200).json(leaderB);
    } catch (e) {
      return res.status(200).json({ message: this.internalError });
    }
  };
}
