import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";

async function connect() {
  //createing MongoMemoryServer instance
  const mongodb = await MongoMemoryServer.create();
  const getUrl = mongodb.getUri();

  mongoose.set("strictQuery", true);
  //connecting to database
  const db = await mongoose.connect(getUrl);
  console.log("Database Connected");
  return db;
}

export default connect;
