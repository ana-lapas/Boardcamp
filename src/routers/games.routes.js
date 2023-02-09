import { Router } from "express";
import { getGames, postGame } from "../controllers/games.controllers.js";
import { validateNewGame } from "../middlewares/game.middlewares.js";

const gameRouter = Router();

gameRouter.get("/games", getGames);
gameRouter.post("/games", validateNewGame, postGame);

export default gameRouter;