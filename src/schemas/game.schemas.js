import joi from 'joi';

export const newGameSchema = joi.object({
    name: joi.string().required().min(2),
    image: joi.string().uri().required().min(10),
    stockTotal: joi.number().required().positive(),
    pricePerDay: joi.number().required().positive()
});