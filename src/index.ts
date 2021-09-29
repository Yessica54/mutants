import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import { mutantsRouter } from "./mutants/mutants.router";
import { statsRouter } from "./stats/stats.router";
import { notFoundHandler } from "./commons/middleware/not-found.middleware";

 
dotenv.config();

/**
 * App Variables
 */

 if (!process.env.PORT) {
    process.exit(1);
 }
 
 const PORT: number = parseInt(process.env.PORT as string, 10);
 const DATABASE_URL: string = process.env.DATABASE_URL;

 const app = express();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/mutant', mutantsRouter);
app.use('/api/stats', statsRouter);

// Middleware
app.use(notFoundHandler); 

// BD Activation
mongoose.connect(DATABASE_URL, () => {
    console.log(`Connected to Database`);
})

/**
 * Server Activation
 */

app.listen(PORT, () => {
   console.log(`Listening on port ${PORT}`);
});
  