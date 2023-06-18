import User from '../../models/User.js';
import dotenv from 'dotenv';
import { generateToken } from '../../utils/generateToken.js';
dotenv.config();

const register_user = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    if (!email && !password && !firstName && !lastName)
      return res.status(404).json({ error: 'Missing payload' });

    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const createUser = new User({
      email,
      password,
      firstName,
      lastName,
    });

    await createUser.save();

    const token = generateToken(createUser);

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const login_user = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const get_users = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export { register_user, login_user, get_users };
