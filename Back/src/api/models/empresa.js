 
const { Schema, model } = require('mongoose');

const companySchema = new Schema({
    nombre: String,
    cedula: String,
    facturas: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Factura'
        },
    ]
});

module.exports = new model('Empresa', companySchema);