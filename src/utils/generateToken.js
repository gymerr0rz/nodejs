import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const generateToken = (user) => {
  const payload = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };

  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
};

export { generateToken };
