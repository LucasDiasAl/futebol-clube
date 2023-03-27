import { Router } from 'express';
import teamRouter from './teams.routes';
import usersRouter from './users.routes';
import matchesRouter from './matches.routes';
import leaderBoardRoutes from './leaderBoard.routes';

const router = Router();

router.use('/login', usersRouter);
router.use('/teams', teamRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardRoutes);
export default router;
