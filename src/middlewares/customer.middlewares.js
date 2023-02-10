import { db } from "../database/database.connection.js";
import { customerSchema } from "../schemas/customer.schemas.js";
import dayjs from "dayjs";

export async function validateCustomer(req,res,next){
    const customer = req.body;
    const{ cpf }= req.body;    
    
    const { error } = customerSchema.validate(customer, { abortEarly: false });

    if (error) {
        const errors = error.details.map(detail => detail.message);
        return res.status(400).send(errors);
    }
    
    try {
        const existingCustomer = await db.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf]);
        if (existingCustomer.rows.length > 0) {
            return res.status(409).send("Cliente já cadastrado");
        }

    } catch (err) {
        res.status(500).send(err.message);
        return;
    }
    res.locals.customer = customer;
    next();
};
