import { Router } from "express";
import { getGames } from "../controllers/games.controllers.js";

const gameRouter = Router();

gameRouter.get("/games", getGames);
//gameRouter.post("/games", )

export default gameRouter;