import jwt from 'jsonwebtoken';
const { sign, decode, verify } = jwt;
import { Request, Response, NextFunction } from 'express';


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ error: 'Acceso denegado' })
  try {
      const verified = jwt.verify(token, process.env.JWT_SECRET || 'default')
      next() // continuamos
  } catch (error) {
      res.status(400).json({error: 'token no es válido'})
  }

};

export default authMiddleware;
