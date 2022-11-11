import express from "express";
import userRoutes from './routes/usersRoutes.js';
import expensesRoutes from './routes/expensesRoutes.js';
import savingsRoutes from "./routes/savingsRoutes.js";
import taskRoutes from "./routes/tasksRoutes.js";
import './config.js';
import cors from "cors";



const app = express();

app.use(cors());

// áca usamos el método json de express para que las rutas puedan interpretar los datos del body
app.use(express.json())

app.use('/api', userRoutes);
app.use('/api', expensesRoutes);
app.use('/api', savingsRoutes);
app.use('/api', taskRoutes);


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization");
  next();
});

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found.'
    })
});

export default app;
