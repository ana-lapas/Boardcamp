import { db } from "../database/database.connection.js";

export async function getCustomers(req, res) {
    try {
        const existingCustomers = await db.query("SELECT * FROM customers");
        return res.status(200).send(existingCustomers.rows);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export async function getCustomerId(req, res) {
    const { id } = req.params;
    try {
        const existingCustomer = await db.query(`SELECT * FROM customers WHERE id=$1`, [id]);
        if (existingCustomer.rows.length === 0) {
            return res.sendStatus(404);
        }
        return res.status(200).send(existingCustomer.rows[0]);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export async function postCustomer(req, res) {
    const { name, phone, cpf, birthday } = res.locals.customer;
    try {
        await db.query(`INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)`, [name, phone, cpf, birthday]);
        return res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export async function putCustomer(req, res) {
    const { name, phone, cpf, birthday } = res.locals.customer;
    const { id } = req.params;
    try {
        await db.query('UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5',
            [name, phone, cpf, birthday, id]);
        return res.sendStatus(200);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};