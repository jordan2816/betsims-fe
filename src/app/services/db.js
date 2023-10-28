import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017"; // Replace with your MongoDB server URL
const dbName = "betsims"; // Replace with your database name

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function insertDocument(collectionName, document) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(document);
    console.log("Document inserted:", result.insertedId);
    return result.insertedId;
  } catch (error) {
    console.error("Error inserting document:", error);
    return null;
  }
}

async function findDocuments(collectionName, query) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.find(query).toArray();
    console.log("Documents found:", result);
    return result;
  } catch (error) {
    console.error("Error finding documents:", error);
    return [];
  }
}

async function updateDocument(collectionName, query, update) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(query, { $set: update });
    console.log("Document updated:", result.modifiedCount);
    return result.modifiedCount;
  } catch (error) {
    console.error("Error updating document:", error);
    return 0;
  }
}

async function deleteDocument(collectionName, query) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne(query);
    console.log("Document deleted:", result.deletedCount);
    return result.deletedCount;
  } catch (error) {
    console.error("Error deleting document:", error);
    return 0;
  }
}

export {
  client,
  connectDB,
  insertDocument,
  findDocuments,
  updateDocument,
  deleteDocument,
};
