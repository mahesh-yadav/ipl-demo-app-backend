export async function findMatches(
  client,
  filterDoc = {},
  skip = 0,
  limit = 10
) {
  try {
    const db = client.db('xseed');
    const collection = db.collection('matches');

    const projectionDoc = {
      date: 1,
      _id: 0,
      team1: 1,
      team2: 1,
      winner: 1,
      win_by_runs: 1,
      win_by_wickets: 1,
      id: 1,
    };

    let docs = await collection
      .find(filterDoc)
      .project(projectionDoc)
      .skip(skip)
      .limit(limit)
      .toArray();

    let count = await collection.countDocuments(filterDoc);

    return {
      docs,
      count,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function findOneMatch(client, id) {
  try {
    const db = client.db('xseed');
    const collection = db.collection('matches');

    let doc = await collection.findOne({ id });

    return doc;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
