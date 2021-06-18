 
const { Schema, model } = require('mongoose');

const billSchema = new Schema({
    productos: [
        {
            nombre: String,
            precioVenta: Number,
            precioCompra: Number,
            marca: String,
            cantidad: Number
        },
    ],
   pagado: Boolean,
   metodoPago: String,
   monto: Number,
   count: Number
}, {timestamps:true});

module.exports = new model('Factura', billSchema);