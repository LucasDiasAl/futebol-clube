import { Router } from 'express';
import MatchesController from '../controller/matches.controller';

const router = Router();

const matchesController = new MatchesController();

router.get('/', matchesController.getAll);

export default router;
