import { db } from "../database/database.connection.js";
import { newRentSchema } from "../schemas/rent.schema.js";


export async function validateNewRent(req, res, next) {
    const newRent = req.body;
    const { customerId, gameId } = req.body;
    const { error } = newRentSchema.validate(newRent, { abortEarly: false });

    if (error) {
        const errors = error.details.map(detail => detail.message);
        return res.status(400).send(errors);
    }
    try {
        const existingCustomer = await db.query(`SELECT * FROM customers WHERE id=$1`, [customerId]);
        if (existingCustomer.rows.length === 0) {
            return res.sendStatus(400);
        }
        const existingGame = await db.query(`SELECT * FROM games WHERE id=$1`, [gameId]);
        if (existingGame.rows.length === 0) {
            return res.sendStatus(400);
        }
        const checkNumberOfGames = existingGame.rows[0].stockTotal;
        
        const checkNumberofGamesAlredyRented = await db.query(`SELECT * FROM rentals WHERE "gameId"=$1`, [gameId]);
        if (checkNumberofGamesAlredyRented.rows.length >= checkNumberOfGames) {
            return res.sendStatus(400);
        }

    } catch (err) {
        res.status(500).send(err.message);
        return;
    }
    res.locals.newRent = newRent;
    next();
}