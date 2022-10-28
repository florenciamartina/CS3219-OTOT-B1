import {
  ormCreateDiveLog as _createDivelog,
  ormGetDiveLogByYear as _getDivelogByYear,
  ormGetDiveLogByName as _getDivelogByName,
  ormUpdateDivelog as _updateDivelog,
  ormDeleteDivelog as _deleteDivelog,
} from "../model/dive-log/divelog-orm.js";
import { getUserWithoutPassword } from "../model/repository.js";
import { ormGetUserWithoutPassword as _getUserWithoutPassword } from "../model/user/user-orm.js";

const isUserExist = async (username) => {
  try {
    const user = await _getUserWithoutPassword(username);
    return user;
  } catch (err) {
    return false;
  }
};

export async function createDivelog(req, res) {
  try {
    const { username, name, year, location, depth, duration, comments } =
      req.body;
    // const username = req.username;
    const isUser = await isUserExist(username);
    console.log(isUser);
    if (!isUser) {
      return res
        .status(404)
        .json({ message: `User ${username} does not exist` });
    }

    if (username && name) {
      const resp = await _createDivelog(
        username,
        name,
        year,
        location,
        depth,
        duration,
        comments
      );
      if (resp.err) {
        if (
          resp.err.name &&
          resp.err.name === "MongoServerError" &&
          resp.err.code === 11000
        ) {
          return res
            .status(409)
            .json({ message: `Divelog ${name} already exists` });
        }
        return res
          .status(400)
          .json({ message: "Could not create a new dive log!" });
        // }
      } else {
        console.log(
          `Created new dive log ${name} for ${username} successfully!`
        );
        return res.status(201).json({
          message: `Created new dive log ${name} for ${username} successfully!`,
        });
      }
    } else {
      return res.status(400).json({ message: "Dive log name is missing!" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Database failure when creating new dive log!" });
  }
}

export async function getDiveLogByName(req, res) {
  try {
    const { username, name } = req.query;
    // const username = req.username;
    if (username && name) {
      const log = await _getDivelogByName(username, name);
      if (!log) {
        return res
          .status(404)
          .json({ message: `Dive log ${name} does not exist` });
      } else {
        return res.status(200).json(log);
      }
    } else {
      return res.status(400).json({ message: "Dive log name is missing!" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Database failure when getting dive log" });
  }
}
export async function getDiveLogByYear(req, res) {
  try {
    const { username, year } = req.query;
    // const username = req.username;
    if (username && year) {
      const log = await _getDivelogByYear(username, year);
      if (!log) {
        return res
          .status(404)
          .json({ message: `Dive log written in ${year} does not exist` });
      } else {
        return res.status(200).json(log);
      }
    } else {
      return res.status(400).json({ message: "Dive log year is missing!" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Database failure when getting dive log" });
  }
}

export async function updateDivelog(req, res) {
  let depth = req.body.depth ? req.body.depth : null;
  let duration = req.body.duration ? req.body.duration : null;
  let comments = req.body.comments ? req.body.comments : "";
  try {
    const { username, name } = req.body;
    // const username = req.username;
    const isExist = await isUserExist(username);
    if (!isExist) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (name && username && (depth || duration || comments)) {
      const updated = _updateDivelog(username, name, depth, duration, comments);
      if (updated.err) {
        return res.status(400).json({ message: "Wrong fields!" });
      } else if (updated) {
        return res
          .status(200)
          .json({ message: "Successfully updated dive log." });
      }
    } else {
      return res.status(400).json({ message: "Dive log name is missing!" });
    }
  } catch (err) {
    console.log("Error : " + err);
    return res.status(500).json({ err });
  }
}

export async function deleteDivelog(req, res) {
  try {
    const { username, name } = req.body;
    // const username = req.username;
    if (username && name) {
      const isDeleted = await _deleteDivelog(username, name);
      if (!isDeleted) {
        return res.status(400).json({ message: "Dive log does not exist!" });
      } else if (isDeleted) {
        return res
          .status(200)
          .json({ message: "Successfully deleted dive log." });
      }
    } else {
      return res.status(400).json({ message: "Dive log name missing!" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Database failure when deleting dive log" });
  }
}
