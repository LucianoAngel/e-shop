 
const { Schema, model } = require('mongoose');

const personSchema = new Schema({
    nombre: String,
    cedula: String,
    facturas: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Factura'
        },
    ]
});

module.exports = new model('Persona', personSchema);