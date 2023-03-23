import { Router } from 'express';
import MatchesController from '../controller/matches.controller';
import TokenValid from '../middlewares/token.validation.Middleware';

const router = Router();

const matchesController = new MatchesController();
const tokenValid = new TokenValid();

router.patch('/:id', tokenValid.tokenValidation, matchesController.updateMatch);
router.patch('/:id/finish', tokenValid.tokenValidation, matchesController.finishMatche);
router.get('/', matchesController.getAll);

export default router;
