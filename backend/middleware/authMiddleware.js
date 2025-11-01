const jwt = require('jsonwebtoken')
const User = require('../models/usersModels')

const protect = async(req, res, next) => {
    let token
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //obtener el token
            token = req.headers.authorization.split(' ')[1]

            //verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //obtener los datos del usaurio desde el token
            req.user = await User.findById(decoded.id).select(-password)

            next()
        }
        catch(error){
            res.status(401)
            throw new Error('Accedo no autorizado')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Accedo no autorizado, no se proporciono un token')
    }
}

module.exports={protect}