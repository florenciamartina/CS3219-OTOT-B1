import {
  createDiveLog,
  getDiveLogByYear,
  getDiveLogByName,
  updateDiveLog,
  deleteDiveLog,
} from "../repository.js";
import "dotenv/config";

//need to separate orm functions from repository to decouple business logic from persistence

// CREATE FUNCTION

export async function ormCreateDiveLog(
  username,
  name,
  year,
  location,
  depth,
  duration,
  comments
) {
  try {
    const log = await createDiveLog({
      username,
      name,
      year,
      location,
      depth,
      duration,
      comments,
    });
    await log.save();
    return true;
  } catch (err) {
    return { err };
  }
}

// READ FUNCTION
export async function ormGetDiveLogByName(username, name) {
  try {
    const log = await getDiveLogByName(username, name);
    return log;
  } catch (err) {
    return { err };
  }
}

export async function ormGetDiveLogByYear(username, year) {
  try {
    const logs = await getDiveLogByYear(username, year);
    return logs;
  } catch (err) {
    return { err };
  }
}

// UPDATE FUNCTION
export async function ormUpdateDivelog(
  username,
  name,
  depth = null,
  duration = null,
  comments = ""
) {
  try {
    const updatedLog = await updateDiveLog({
      username,
      name,
      depth,
      duration,
      comments,
    });
    console.log("UpdatedLog: " + updatedLog);

    return updatedLog;
  } catch (err) {
    return { err };
  }
}

// DELETE FUNCTION
export async function ormDeleteDivelog(username, name) {
  try {
    return await deleteDiveLog(username, name);
  } catch (err) {
    console.log(`ERROR: Could not delete dive log from DB.`);
    return { err };
  }
}
