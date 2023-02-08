import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import gameRouter from "./routers/games.routes.js";
import customerRouter from "./routers/customer.routes.js";
import rentalsRouter from "./routers/rentals.routes.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(gameRouter);
app.use(customerRouter);
app.use(rentalsRouter); 

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server runnin on port ${port}`));