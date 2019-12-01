import { findMatches, findOneMatch } from '../db/matches';
import { DatabaseError } from '../helpers/errors';

export const getMatches = async (req, res, next) => {
  try {
    let { skip, limit, search, filter } = req.query;

    skip = skip ? parseInt(skip) : 0;
    limit = limit ? parseInt(limit) : 10;

    let filterDoc = search
      ? {
          $or: [{ team1: search }, { team2: search }],
        }
      : {};

    if (filter && filter !== 'ALL') {
      filterDoc.season = parseInt(filter);
    }

    const { docs, count } = await findMatches(filterDoc, skip, limit);
    res.status(200).json({
      docs,
      count,
    });
  } catch (err) {
    console.log(err);

    let error = new DatabaseError('Failed to fetch data', 500);
    next(error);
  }
};

export const getMatch = async (req, res, next) => {
  try {
    let doc = await findOneMatch(parseInt(req.params.matchId));
    res.status(200).json(doc);
  } catch (err) {
    console.log(err);

    let error = new DatabaseError('Failed to fetch data', 500);
    next(error);
  }
};
