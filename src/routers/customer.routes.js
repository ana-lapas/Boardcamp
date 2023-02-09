import { Router } from "express";
import { getCustomers, postCustomer } from "../controllers/customer.controllers.js";
import { validateNewCustomer } from "../middlewares/customer.middlewares.js";
const customerRouter = Router();

customerRouter.get("/customers", getCustomers);
customerRouter.post("/customers", validateNewCustomer, postCustomer);
/*customerRouter.get("/customers/:id", );
customerRouter.put("/customers/:id",);
*/
export default customerRouter;