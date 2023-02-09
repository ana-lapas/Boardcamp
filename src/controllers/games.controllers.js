import { db } from "../database/database.connection.js";

export async function getGames(req, res) {
    try {
        const gamesListed = await db.query("SELECT * FROM games");
        res.status(200).send(gamesListed.rows);
        return;

    } catch (err) {
        res.status(500).send(err.message);
        return;
    }

}

export async function postGame(req, res) {
    const { name, image, stockTotal, pricePerDay }= res.locals.newGame;
    try {     
        const newGamePosted = await db.query(`INSERT INTO games (name,image,"stockTotal","pricePerDay") VALUES ($1,$2,$3,$4)`, [name,image,stockTotal,pricePerDay]);
        return res.sendStatus(201);
        
    } catch (err) {
        return res.status(500).send(err.message);
    }
}