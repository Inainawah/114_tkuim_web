import { getCollection } from '../db.js';
import { ObjectId } from 'mongodb';

export async function findAll() {
  return getCollection('participants').find().toArray();
}

export async function findByOwner(ownerId) {
  return getCollection('participants').find({ ownerId }).toArray();
}

export async function findById(id) {
  return getCollection('participants').findOne({ _id: new ObjectId(id) });
}

export async function createParticipant(data) {
  const result = await getCollection('participants').insertOne({
    ...data,
    createdAt: new Date()
  });
  return { ...data, _id: result.insertedId };
}

export async function deleteById(id) {
  return getCollection('participants').deleteOne({ _id: new ObjectId(id) });
}