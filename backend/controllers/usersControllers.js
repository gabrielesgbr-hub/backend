const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require ('../models/usersModels')

const login = asyncHandler(async(req,res) => {
    res.status(200).json({message:'login'})
})

const register = asyncHandler(async(req,res) => {
    //desestructurar el body
    const {nombre, email, password} = req.body
    //verificamos que se pasen todos los campos
    if (!nombre || !email || !password){
        res.status(400)
        throw new Error('Faltan datos')
    }
    //verificamos que ese usuario no existe y si no existe guardarlo
    const userExists = await User.findOne({email})
    if (userExists){
        res.status(400)
        throw new Error('Ese usuario ya existe')
    } else{
        //hash al password
        const salt = await bcrypt.genSalt(10)
        const passwordHashed = await bcrypt.hash(password, salt)
        
        //crear el usuario
        const user = await User.create({
            nombre,     //nombre:nombre
            email,      //email:email
            password: passwordHashed
        })

        //Si el usuario se creo correctamente lo muestro
        if (user){
            res.status(201).json({
                _id: user.id,
                nombre: user.nombre,
                email: user.email,
                password: user.password
            })
        } else{
            res.status(400)
            throw new Error ('No se pudieron guardar los datos')
        }
    }
})

const data = asyncHandler(async(req,res) => {
    res.status(200).json({message: 'data'})
})

module.exports = {
    login, register, data
}