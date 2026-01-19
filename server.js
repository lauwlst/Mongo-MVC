// cargar variables de entorno
require('dotenv').config()

// importar dependencias
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//crear app de express
const app= express()

//cors
app.use(cors())

//middleware para leer JSON cuando hagamos una petición a la bbdd
app.use(express.json())

// conexión a Mongodb con Mongoose
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('👌 Estás conectado a la BBDD'))
.catch(err => console.error('❌ Error al conectar la BBDD', err))

//Rutas de User
const userRoutes = require ('./routes/userRoutes')
app.use('/api/users', userRoutes) // definimos el endpoint de nuestra api hacia este modelo en concreto

//Rutas de Auth
const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)


app.post('/createuser', async (req, res) => {
    try {
        //crear una instancia del modelo con los datos del body de la petición
        const newUser = new User(req.body)
        //guardar en la base de datos el nuevo usuario
        const saveUser = await newUser.save()
        //responder con el documento guardado
        res.status(201).json(saveUser) //201:Created
        
    } catch (err) {
        //manejo de errores de la petición
        res.status(400).json({error: err.message}) //400: Bad Request
    }

} )

// Manejo de rutas no encontradas
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada💀'}))



//Middleware de errores
const errorGes = require('./middlewares/errorGes')
app.use(errorGes)

//arrancar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`))
