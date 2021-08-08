const express = require('express')
const fs = require('fs')

const app = express()

app.listen(3000, () =>  console.log("Servidor iniciado en el puerto 3000"))

app.use(express.static("assets")) //disponibiliza la ruta assets para que la pueda usar el index.html. Se escribe sin /

app.use("/abracadabra/juego/:nombre", (req, res, next) => { //esto es un middleware
    const {usuarios} = JSON.parse(fs.readFileSync("usuarios.json"))
    const nombre = req.params.nombre
    if (usuarios.some(u => u === nombre)){
        next()
    }
    else{
        res.status(401).sendFile(__dirname + "/assets/who.jpeg")
    }
}) 

app.use("/abracadabra/juego/:nombre", (req, res, next) => { //esto es un middleware
    console.log("entre al segundo middleware")
    next()
}) 

app.get("/abracadabra/juego/:nombre", (req, res) => { //este se disponibiliza con nombre
    res.sendFile(__dirname + "/index.html")
}) 

app.get("/usuarios", (req, res) => {
    res.sendFile(__dirname + "/usuarios.json")
})

app.get("/abracadabra/conejo/:n", (req, res) => {
    const numeroEscogido = req.params.n
    const numeroAleatorio = Math.floor(Math.random()*4 + 1)
    if (numeroEscogido == numeroAleatorio){
        res.sendFile(__dirname + "/assets/conejito.jpg")
    }
    else{
        res.sendFile(__dirname + "/assets/voldemort.jpg")
    }
})

app.get("*", (req,res) => {
    // res.send("No hay nada en esta página...") //poner gato http
    res.redirect(421,"https://http.cat/421")
})
