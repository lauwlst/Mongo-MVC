// CONTROLADOR --- Contiene la lógica (funciones) que se ejecutan en las rutas
// Recibe la petición (req) >>> Usa el modelo (importamos el modelo) >>> responde (res)

const User = require('../models/UserModel')

// Traer todos los usuarios - Read- GET -/
const getAllUsers = async (req, res) => {
    const allUsers = await User.find()
    res.status(200).json(allUsers)
}

// Traer un usuario por id - Read - GET - /:id
const getUserById = async(req, res) => {
    try {
        const { id } = req.params; //path variable
        const  user = await User.findById(id)
        
        if(!user) {
            return req.status(404).json({ error: "Usuario no encontrado"}) // 404: Not found
        }
        return res.status(200).json(user)// 200: OK
    } catch (err) {
        return res.status(400).json({ error: 'ID inválido'}) // 400:id no válido
    }
}
//Crear un usuario - Create - POST - /

const createUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body)
        const saveUser = await newUser.save()
        res.status(201).json(saveUser) //201:Created
        
    } catch (err) {
        res.status(400).json({error: err.message}) //400: Bad Request
    }

}

// Actualizar un usuario - Update - PUT -/:id
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateUser = await User.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidator: true }
)
if(!updateUser) {
    return res.status(404).json({ error: "Usuario no encontrado"})
}
return res.status(200).json(updateUser)
    } catch (err) {
       next (err) 
    }
    }


// Eliminar un usuario - Delete - DELETE - /:id

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await User.findByIdAndDelete(id)
if(!deleteUser) {
    return res.status(404).json({ error: "Usuario no encontrado"})
}
return res.status(204).json({message:'Usuario eliminado correctamente'}) //204: No content
    } catch (err) {
        return res.status(400).json({ error: 'ID inválido'})  
    }
    }

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}