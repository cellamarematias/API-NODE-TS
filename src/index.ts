import express, { Request, Response, NextFunction } from "express";
import userRoutes from './routes/usersRoutes';
import savingsRoutes from "./routes/savingsRoutes";
import './config';
import cors from "cors";
import { PORT } from './config';

const app = express();

app.use(cors());
app.use(express.json()); // transforma la req.body en un json

app.use('/api', userRoutes);
app.use('/api', savingsRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization");
  next();
});

app.use((req: Request, res: Response) => {
    res.status(404).json({
        message: 'Endpoint not found.'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
