import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { withUsers } from '../utils/db';
import { User } from '../types';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

async function ensureAdmin() {
  await withUsers(async (users) => {
    const exists = users.find(u => u.username === 'admin');
    if (!exists) {
      const hash = await bcrypt.hash('admin', 10);
      users.push({ id: uuid(), username: 'admin', passwordHash: hash, role: 'admin', createdAt: new Date().toISOString() });
    }
  });
}
ensureAdmin().catch(console.error);

router.post('/register',
  body('username').isString().isLength({ min: 3 }),
  body('password').isString().isLength({ min: 4 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ ok: false, errors: errors.array() });
    const { username, password } = req.body as { username: string; password: string };
    const created = await withUsers(async (users) => {
      if (users.some(u => u.username === username)) throw { status: 400, message: 'Usuario ya existe' };
      const hash = await bcrypt.hash(password, 10);
      const user: User = { id: uuid(), username, passwordHash: hash, role: 'user', createdAt: new Date().toISOString() };
      users.push(user);
      return { id: user.id, username: user.username };
    });
    res.json({ ok: true, user: created });
  }
);

router.post('/login',
  body('username').isString(),
  body('password').isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ ok: false, errors: errors.array() });
    const { username, password } = req.body;
    const user = await withUsers(async (users) => users.find(u => u.username === username));
    if (!user) return res.status(401).json({ ok: false, error: 'Credenciales inválidas' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ ok: false, error: 'Credenciales inválidas' });
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '8h' });
    res.json({ ok: true, token });
  }
);

export default router;
