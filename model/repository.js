import "dotenv/config";
import mongoose from "mongoose";
import DiveLogModel from "./dive-log/divelog-model.js";
import UserModel from "./user/user-model.js";

let mongoDB =
  process.env.ENV == "PROD"
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Successfully connected to MongoDB"));
db.collections.divelogmodels.createIndex(
  { username: 1, name: 1 },
  { unique: true }
);

// CREATE FUNCTION
export async function createDiveLog(params) {
  return await DiveLogModel.create({
    username: params.username,
    name: params.name,
    year: params.year,
    location: params.location,
    depth: params.depth,
    duration: params.duration,
    comments: params.comments,
  });
}

// READ FUNCTION
export async function getDiveLogByName(username, name) {
  console.log(name);
  const log = await DiveLogModel.findOne({ username: username, name: name });
  console.log("Log: " + log);
  if (log) {
    return log;
  }
}

export async function getDiveLogByYear(username, year) {
  console.log(year);
  const logs = await DiveLogModel.find({ username: username, year: year });
  if (logs) {
    return logs;
  }
}

// UPDATE FUNCTION
export async function updateDiveLog(updatedParams) {
  const oldLog = await DiveLogModel.findOne({
    username: updatedParams.username,
    name: updatedParams.name,
  });
  if (oldLog) {
    const updated = await DiveLogModel.updateOne(
      {
        username: updatedParams.username,
        name: updatedParams.name,
      },
      {
        $set: {
          depth: updatedParams.depth ? updatedParams.depth : oldLog.depth,
          duration: updatedParams.duration
            ? updatedParams.duration
            : oldLog.duration,
          comments: updatedParams.comments
            ? updatedParams.comments
            : oldLog.comments,
        },
      }
    );
    return updated;
  }
}

// DELETE FUNCTION
export async function deleteDiveLog(username, name) {
  const log = await DiveLogModel.findOne({ username: username, name: name });
  if (log) {
    const deleted = await DiveLogModel.deleteOne({ username, name: name });
    console.log(deleted);
    return deleted.acknowledged;
  }
}

// CREATE FUNCTION
export async function createUser(params) {
  return await UserModel.create({
    username: params.username,
    hashedPassword: params.hashedPassword,
  });
}

// READ FUNCTION
export async function getUser(params) {
  const user = await UserModel.findOne({ username: params.username });
  if (user && user.comparePassword(params.password)) {
    return user;
  }
}

export async function getUserWithoutPassword(params) {
  const user = await UserModel.findOne({ username: params.username });
  return user;
}
