import dayjs from "dayjs";
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
};

export async function postRent(req, res) {
    const { customerId, gameId, daysRented } = res.locals.newRent;
    
    try {
        const gameInfo = await db.query(`SELECT * FROM games WHERE id=$1`, [gameId]);
        const rentDate = dayjs().format('YYYY-MM-DD');
        const returnDate = null;
        const originalPrice = daysRented * gameInfo.rows[0].pricePerDay;
        const delayFee = null;
        await db.query(`INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7)`,[customerId,gameId,rentDate,daysRented,returnDate,originalPrice,delayFee]);
        return res.sendStatus(201);

    } catch (err) {
        return res.status(500).send(err.message);
    }
};

