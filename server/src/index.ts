import dotenv from "dotenv";
import cors from "cors";
import express, { Application } from 'express';

// Configurations

dotenv.config();

// Initializations

const port: number = 5000;
const app: Application = express();

// Routes and Middlewares

import UserRoutes from "./routes/UserRoutes";

app.use(
  cors({
    exposedHeaders: "calitoken",
  })
);
app.use(express.json());

app.use("/api/users", UserRoutes)

// Server Listening

app.listen(port, (): void => console.log(`Server Running on http://localhost:${port}/`));