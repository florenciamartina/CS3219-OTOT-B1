import { createUser, getUser, getUserWithoutPassword } from "../repository.js";
import "dotenv/config";

//need to separate orm functions from repository to decouple business logic from persistence

// CREATE FUNCTION
export async function ormCreateUser(username, hashedPassword) {
  try {
    const newUser = await createUser({ username, hashedPassword });
    await newUser.save();
    return true;
  } catch (err) {
    return { err };
  }
}

// READ FUNCTION
export async function ormGetUser(username, password) {
  try {
    const user = await getUser({ username, password });
    return user;
  } catch (err) {
    console.log(`ERROR: Could not get user from DB. User does not exist.`);
    return { err };
  }
}

export async function ormGetUserWithoutPassword(username) {
  try {
    const user = await getUserWithoutPassword({ username });
    return user;
  } catch (err) {
    console.log(`ERROR: Could not get user from DB. User does not exist.`);
    return { err };
  }
}
