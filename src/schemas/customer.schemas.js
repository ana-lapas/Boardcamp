import joi from 'joi';

export const customerSchema = joi.object({
    name: joi.string().required().min(8),
    phone: joi.string().regex(/^\d+$/).required().min(10).max(11),
    cpf: joi.string().regex(/^\d+$/).required().min(11).max(11),
    birthday: joi.date().required()
});
