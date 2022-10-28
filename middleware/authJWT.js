import jwt from "jsonwebtoken";

export function verifyUser(req, res, next) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const tokenFromUser = req.headers.authorization.split(" ")[1];
    try {
      jwt.verify(tokenFromUser, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
        if (err) {
          console.log("Error: " + err);
          return res.status(401).send({ message: "Unauthorized access!" });
        }
        req.username = decoded.username;
        next();
      });
    } catch (err) {
      return res.status(401).json({ message: "Invalid JWT token!" });
    }
  } else {
    return res.status(401).json({ message: "Missing JWT token!" });
  }
}
