import { Router } from "express";
import { getRentals, postRent, finishRent, deleteRent } from "../controllers/rentals.controllers.js";
import { validateNewRent, validateFinishRent, validateDeleteRent } from "../middlewares/rent.middleware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateNewRent, postRent);
rentalsRouter.post("/rentals/:id/return", validateFinishRent, finishRent);
rentalsRouter.delete("/rentals/:id", validateDeleteRent, deleteRent);

export default rentalsRouter;