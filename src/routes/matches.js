import express from 'express';
import { getMatch, getMatches } from '../controllers/matches';

const matchesRouter = express.Router();

matchesRouter.get('/', getMatches);

matchesRouter.get('/:matchId', getMatch);

export default matchesRouter;
