 
const { Schema, model } = require('mongoose');

const cajaSchema = new Schema({
    productos: [
        {
            nombre: String,
            precioVenta: Number,
            precioCompra: Number,
            marca: String,
            cantidad: Number
        },
    ],
}, {timestamps:true});

module.exports = new model('ProductoCaja', cajaSchema);