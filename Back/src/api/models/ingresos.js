 
const { Schema, model } = require('mongoose');

const revenueSchema = new Schema({
    facturas: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Factura'
        },
    ]
});

module.exports = new model('Ingresos', revenueSchema);