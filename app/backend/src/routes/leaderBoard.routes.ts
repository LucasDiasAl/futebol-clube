import { Router } from 'express';
import LeaderBoardController from '../controller/leaderBoard.controller';

const router = Router();

const leaderBoardController = new LeaderBoardController();

router.get('/home', leaderBoardController.getHomeGames);
router.get('/away', leaderBoardController.getAwayGames);
router.get('/', leaderBoardController.getAllGames);

export default router;
