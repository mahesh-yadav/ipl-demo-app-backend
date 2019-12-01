import { MongoClient } from 'mongodb';

const dbUrl = 'mongodb://localhost:30000';
const PORT = process.env.PORT || 4000;

export const client = new MongoClient(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function connectToDB(app) {
  try {
    await client.connect();

    console.log('Connected to Database...');

    app.listen(PORT, () => {
      console.log(`Server is running at localhost:${PORT}........`);
    });
  } catch (error) {
    console.log(error);
  }
}

process.on('SIGINT', async () => {
  try {
    await client.close();
  } catch (err) {
    console.log(err);
  } finally {
    process.exit(1);
  }
});
