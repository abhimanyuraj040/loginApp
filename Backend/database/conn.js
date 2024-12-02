import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";

async function connect() {
  const mongodb = await MongoMemoryServer.create();
  const getUrl = mongodb.getUri();

  mongoose.set("strictQuery", true);
  const db = await mongoose.connect(getUrl);
  console.log("Database Connected");
  return db;
}

export default connect;
