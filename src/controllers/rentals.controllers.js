import dayjs from "dayjs";
import { db } from "../database/database.connection.js";

export async function getRentals(req, res) {
    try {
        const existingRentalsCustomer = await db.query(`SELECT * FROM rentals JOIN customers ON rentals."customerId"=customers.id`);
        const existingGames = await db.query(`SELECT * FROM rentals JOIN games ON rentals."gameId"= games.id`);
        const putTogether = existingRentalsCustomer.rows.map((rent) => {
            return ({
                id: rent.id,
                customerId: rent.customerId,
                gameId: rent.gameId,
                rentDate: rent.rentDate,
                daysRented: rent.daysRented,
                returnDate: rent.returnDate,
                originalPrice: rent.originalPrice,
                delayFee: rent.delayFee,
                customer: {
                    id: rent.customerId,
                    name: rent.name,
                },
                game: {
                    id: rent.gameId,
                    name: existingGames.rows[rent.gameId - 1].name
                }
            })
        });
        res.status(200).send(putTogether);
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
        await db.query(`INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7)`, [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]);
        return res.sendStatus(201);

    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export async function finishRent(req, res) {
    const { id } = req.params;

    try {
        const rentInfo = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id]);
        const gameInfo = await db.query(`SELECT * FROM games WHERE id=$1`, [rentInfo.rows[0].gameId]);
        const finishDate = dayjs().format('YYYY-MM-DD');
        const diference = new Date(rentInfo.rows[0].rentDate) - new Date(finishDate);
        const daysPassed = Math.round(diference / (1000 * 60 * 60 * 24));
        const newDelayFee = null;
        if (daysPassed > 0) {
            newDelayFee = daysPassed * gameInfo.rows[0].pricePerDay;
        }
        await db.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3`, [finishDate, newDelayFee, id]);
        return res.sendStatus(200);

    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export async function deleteRent(req, res) {
    const { id } = req.params;

    try {
        await db.query(`DELETE FROM rentals WHERE id=$1`, [id]);
        return res.sendStatus(200);

    } catch (err) {
        return res.status(500).send(err.message);
    }
};
