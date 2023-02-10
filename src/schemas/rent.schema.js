import joi from 'joi';

export const newRentSchema = joi.object({
    customerId: joi.number().positive().required().min(1),
    gameId: joi.number().required().positive().min(1),
    daysRented: joi.number().required().positive().min(1)
});
