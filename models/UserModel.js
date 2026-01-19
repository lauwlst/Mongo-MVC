//MODELO --- Representa los datos (schemas en Mongoose)

const mongoose = require('mongoose')

// definir el esquema (forma del documento)
const userSchema = new mongoose.Schema({
    nombre: {type: String, required: true}, //obligatorio
    email: {type: String, required: true, unique: true}, //obligatorio y único
    edad: {type: Number}, //opcional
    password: {type: String, required: true, minlenght: 6}
 }, { timestamps: true });

// crear el modelo a partir del esquema
module.exports = mongoose.model("User", userSchema)