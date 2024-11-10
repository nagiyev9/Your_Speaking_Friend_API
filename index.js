// Paht
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

dotenv.config();

import { connect } from "./database/db.js";
import { ExpressSession } from "./middleware/session.js";
import MainRouter from "./routes/index.routes.js";

// Port
const PORT = process.env.PORT || 4747;

// App
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(ExpressSession);
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());

// Main Router
app.use('/api', MainRouter);

// App Listen
app.listen(PORT, () => {
    connect();
    console.log(`Server is working on ${PORT} port`);
});