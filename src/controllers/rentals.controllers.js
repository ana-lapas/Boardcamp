import { db } from "../database/database.connection.js";

export async function getRentals(req, res) {
    try {
        const existingRentals = await db.query("SELECT * FROM rentals");
        res.status(200).send(existingRentals.rows);
        return;

    } catch (err) {
        res.status(500).send(err.message);
        return;
    }
}