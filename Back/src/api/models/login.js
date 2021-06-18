 
const { Schema, model } = require('mongoose');

const loginSchema = new Schema({
    username: String,
    password: String,
});

module.exports = new model('Login', loginSchema);