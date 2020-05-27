//Requires
const express = require("express")
const app = express()
const path = require("path")
const bdy = require("body-parser")
const sessionxpres = require("express-session")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/proyecto', {useUnifiedTopology: true, useNewUrlParser:true})
app.use(sessionxpres({secret:"session", saveUninitialized:false, resave:false}))
app.use(express.static("public"))
app.use(bdy.urlencoded({extended:true}))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/src/views"))

app.listen(3002, ()=>{console.log("listening in port 3000")})

const computadora = mongoose.Schema({
    proc: String,
    ram: String,
    SO: String,
    bios: String,
    DD: String,
    disponible: Boolean,
    descripcion: String
})
const departamento = mongoose.Schema({
    nombre: String,
    jefe: {
        nombre_jefe: String,
        email: String,
        telefono: String,
        pass: String,
        user: String
    },
    email_dep: String,
    telefono_dep: String,
    ubicacion: String,
    computadoras: [computadora],
})