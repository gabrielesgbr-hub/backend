const express = require('express') //crea una constante para indicar que utilizamos express, colors, dotenv, connectDB
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')
const cors = require('cors')

const port = process.env.PORT || 5000 //el puerto de la app la toma de una variable de entorno (PORT del archivo .env) y si no la encuentra utiliza el puerto 5000

connectDB() //Conexion a la base de datos

const app = express() //creo la app la cual es una constancia nueva de express

app.use(cors()) //cors para conectarnos a un sitio web

app.use(express.json()) //envia y recibe datos en forma de JavaScript Object Notation
app.use(express.urlencoded({extended:false}))

app.use('/api/tareas', require('./routes/tareasRoutes')) //. significa que busca en el mismo nivel
app.use('/api/users', require('./routes/usersRoutes'))

app.use(errorHandler)

app.listen(port, ()=>console.log(`Servidor Iniciado en el puerto: ${port}`))
