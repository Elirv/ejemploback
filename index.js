const express = require('express')
const cors = require('cors')
const { expressjwt:expressJwt } = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const { urlencoded } = require('body-parser')
const { default: mongoose } = require('mongoose')
const helmet = require('helmet')

//conexion a la base de datos

//crear servidor node
const PORT = 4000 //servidor
const app = express()

//configurar el cors
app.use(cors({origin: 'http://localhost:3000'})) 

//convertir ls datos del body a dats json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())

//crear middleware
const jwtCheck = expressJwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://bernersmusicapp.eu.auth0.com/.well-known/jwks.json'  //issuer+.well.....
    }),
    audience: 'https://express.sample', //apis , identifier
    issuer: 'https://bernersmusicapp.eu.auth0.com/', //aplication , domain
    algorithms: ['RS256'] //apis
})

app.get('/privada', jwtCheck, (req, res) =>{
    console.log('privada');
    return res.status(200).json({
        msg: 'Back logueado dice: Bienvenido a Harmony'
    })
})

app.get('/publica', (req, res) =>{
    console.log('publica');
    return res.status(200).json({
        msg: 'Back dice: No hace falta que te loguees'
    })
})
//cargar la configuracion de rutas

//escuchar el servidor
app.listen(PORT, () => {
    console.log('estoy en el puerto 4000');
})