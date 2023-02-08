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