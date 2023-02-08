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