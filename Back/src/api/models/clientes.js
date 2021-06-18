
const { Schema, model } = require('mongoose');

const companySchema = new Schema({
    personas: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Persona'
        },
    ],
    empresas: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Empresa'
        },
    ]
});

module.exports = new model('Clientes', companySchema);