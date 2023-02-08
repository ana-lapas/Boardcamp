import { Router } from "express";
import { getRentals } from "../controllers/rentals.controllers.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
/*rentalsRouter.post("/rentals", );
rentalsRouter.post("/rentals/:id/return", );
rentalsRouter.delete("/rentals/:id", );*/

export default rentalsRouter;