import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

const USER = {
  email: 'admin@example.com',
  password: '123456'
};

const JWT_SECRET = 'your_jwt_secret';

router.post('/login', (req: Request, res: Response): void => {
  const { email, password } = req.body;

  if (email !== USER.email || password !== USER.password) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

export default router;
