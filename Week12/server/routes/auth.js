import express from 'express';
import bcrypt from 'bcrypt';
import { findUserByEmail, createUser } from '../repositories/users.js';
import { generateToken } from '../utils/generateToken.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (await findUserByEmail(email)) return res.status(400).json({ error: 'Email 已被註冊' });
    const hash = await bcrypt.hash(password, 10);
    const user = await createUser({ email, passwordHash: hash, role });
    res.json({ id: user._id, email: user.email });
  } catch (e) { res.status(500).json({ error: '註冊失敗' }); }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: '帳號或密碼錯誤' });
  }
  res.json({ token: generateToken(user), user: { id: user._id, email: user.email, role: user.role } });
});

export default router;