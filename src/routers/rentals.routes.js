import { Router } from "express";
import { getRentals, postRent } from "../controllers/rentals.controllers.js";
import { validateNewRent } from "../middlewares/rent.middleware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateNewRent, postRent);
/*rentalsRouter.post("/rentals/:id/return", );
rentalsRouter.delete("/rentals/:id", );*/

export default rentalsRouter;