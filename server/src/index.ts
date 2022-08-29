import dotenv from "dotenv";
import cors from "cors";
import express, { Application } from 'express';

// Configurations

dotenv.config();

// Initializations

const port: number = 5000;
const app: Application = express();

// Routes and Middlewares

app.use(
  cors({
    exposedHeaders: "calitoken",
  })
);
app.use(express.json());

// Server Listening

app.listen(port, (): void => console.log(`Server Running on http://localhost:${port}/`));