 
const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    nombre: String,
    precioVenta: Number,
    precioCompra: Number,
    marca: String,
    cantidad: Number
},{timestamps:true});

module.exports = new model('Producto', productSchema);