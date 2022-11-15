import jwt from 'jsonwebtoken';
const { sign, decode, verify } = jwt;

const authMiddleware = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ error: 'Acceso denegado' })
  try {
      const verified = jwt.verify(token, process.env.JWT_SECRET)
      next() // continuamos
  } catch (error) {
      res.status(400).json({error: 'token no es válido'})
  }

};

export default authMiddleware;
