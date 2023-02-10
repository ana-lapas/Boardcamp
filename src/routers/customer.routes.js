import { Router } from "express";
import { getCustomers, getCustomerId, postCustomer, putCustomer } from "../controllers/customer.controllers.js";
import { validateCustomer, updateValidation } from "../middlewares/customer.middlewares.js";
const customerRouter = Router();

customerRouter.get("/customers", getCustomers);
customerRouter.post("/customers", validateCustomer, postCustomer);
customerRouter.get("/customers/:id", getCustomerId);
customerRouter.put("/customers/:id", updateValidation, putCustomer );
export default customerRouter;