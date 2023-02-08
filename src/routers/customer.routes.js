import { Router } from "express";
import {getCustomers} from "../controllers/customer.controllers.js";

const customerRouter = Router();

customerRouter.get("/customers", getCustomers);
/*customerRouter.get("/customers/:id", );
customerRouter.post("/customers", );
customerRouter.put("/customers/:id",);
*/
export default customerRouter;