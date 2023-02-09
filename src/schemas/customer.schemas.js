import joi from 'joi';

export const newCustomerSchema = joi.object({
    name: joi.string().required().min(8),
    phone: joi.string().required().min(9),
    cpf: joi.string().required().min(11),
    birthday: joi.string().required().min(8)
});
