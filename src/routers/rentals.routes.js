import { Router } from "express";
import { getRentals, postRent, finishRent } from "../controllers/rentals.controllers.js";
import { validateNewRent, validateFinishRent  } from "../middlewares/rent.middleware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateNewRent, postRent);
rentalsRouter.post("/rentals/:id/return", validateFinishRent, finishRent);
/*rentalsRouter.delete("/rentals/:id", );*/

export default rentalsRouter;