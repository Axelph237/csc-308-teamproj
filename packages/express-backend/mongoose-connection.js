import mongoose from "mongoose";
import createMongooseServices from "./mongoose-services.js";

export let connection;
export let mongooseServices;

export const connectToDB = async () => {
  if (connection) return mongooseServices;

  connection = await mongoose
    .createConnection(process.env.MONGO_URI)
    .asPromise();
  mongooseServices = createMongooseServices(connection);

  console.log("MongoDB Connected");
  return mongooseServices;
};

export const disconnectDB = async () => {
  if (connection) {
    await connection.close();
    connection = null;
  }
};
