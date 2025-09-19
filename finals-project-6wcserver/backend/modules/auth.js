// imports
import jwt from 'jsonwebtoken';

// key
const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
  throw new Error("JWT_SECRET is not defined in .env file");
}

// exports
// create token
export const generateToken = (payload) =>
  jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

// verify token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};
