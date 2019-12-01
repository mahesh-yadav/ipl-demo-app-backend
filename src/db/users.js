import { client } from './connection';
import { ObjectID } from 'mongodb';

export async function createUser(doc) {
  try {
    const db = client.db('xseed');
    const collection = db.collection('users');

    let result = await collection.insertOne(doc);

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function findUserById(id) {
  try {
    const db = client.db('xseed');
    const collection = db.collection('users');

    let user = await collection.findOne({ _id: new ObjectID(id) });

    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function findUserByEmail(email) {
  try {
    const db = client.db('xseed');
    const collection = db.collection('users');

    let user = await collection.findOne({ email });

    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function updateUser() {}

export async function deleteUser() {}
