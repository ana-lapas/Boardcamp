import { db } from "../database/database.connection.js";
import { newGameSchema } from "../schemas/game.schemas.js";

export async function validateNewGame(req, res, next) {
    const newGame = req.body;
    const { name } = req.body;
    const { error } = newGameSchema.validate(newGame, { abortEarly: false });

    if (error) {
        const errors = error.details.map(detail => detail.message);
        return res.status(400).send(errors);
    }
    try {
        const existingGame = await db.query(`SELECT * FROM games WHERE name=$1`, [name]);
        if (existingGame.rows.length > 0) {
            return res.status(409).send("Jogo já cadastrado");
        }

    } catch (err) {
        res.status(500).send(err.message);
        return;
    }
    res.locals.newGame = newGame;
    next();
}