const jwt = require("jsonwebtoken")

//crear token
const createToken = (userId) => {
    return jwt.sign(
        { id: userId }, //id de usuario
        process.env.JWT_SECRET, // secreto de jwt - env
        { expiresIn: process.env.JWT_EXPIRES_IN } // tiempo de validez - env
    )
}

module.exports = { createToken }