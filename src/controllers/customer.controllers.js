import { db } from "../database/database.connection.js";

export async function getCustomers(req, res) {
    try {
        const existingCustomers = await db.query("SELECT * FROM customers");
        res.status(200).send(existingCustomers.rows);
        return;
        

    } catch (err) {
        res.status(500).send(err.message);
        return;
    }

}

export async function postCustomer(req,res){
    const { name, phone, cpf, birthday }= res.locals.newCustomer;
    try {     
        await db.query(`INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)`, [name,phone,cpf,birthday]);
        return res.sendStatus(201);
        
    } catch (err) {
        return res.status(500).send(err.message);
    }    
}