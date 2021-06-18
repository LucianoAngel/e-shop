const Joi = require('@hapi/joi')

// ***VALIDADORES***
const schemaPerson = Joi.object({
    nombre: Joi.string().trim().required(),
    cedula: Joi.string().trim(),
});

const schemaLogin = Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
});

const schemaProduct = Joi.object({
    nombre: Joi.string().trim().required(),
    precioVenta: Joi.number(),
    precioCompra: Joi.number(),
    marca: Joi.string().trim().required(),
    cantidad: Joi.number()
});

module.exports= {schemaPerson, schemaProduct, schemaLogin};