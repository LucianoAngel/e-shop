 
const { Schema, model } = require('mongoose');

const expenseSchema = new Schema({
    productos: [
        {
            nombre: String,
            precioVenta: Number,
            precioCompra: Number,
            marca: String,
            cantidad: Number
        },
    ],
   metodoPago: String,
   monto: Number,
   count: Number
}, {timestamps:true});

module.exports = new model('Gastos', expenseSchema);