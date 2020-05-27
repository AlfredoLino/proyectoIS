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
app.get("/", (req, res)=>{
    if(req.session.user === undefined){
        res.redirect("/login")
    }else{
        res.render("index.ejs", {info : Usuario_on})
    }
})
app.post("/",(req, res) =>{ 
    req.session.user = undefined
    res.redirect("/login")
 })

 app.get("/login",(req, res)=>{ 
    if(req.session.user == null){
        res.render("login", {warning: undefined}) 
    }else{
        res.send("No puede entrar aqui")
    }
})
app.post("/login", async (req, res) => { 

    if( req.body.username<1 || req.body.pass.length<1 ){
        console.log("dentro del warning---------------------------------")
        res.render("login", {warning: "Llene todos los campos, por favor."})
    }else{
        dep_model.findOne({"jefe.email": req.body.username}, (err, doc)=>{
            try {
                if(doc != null && doc.jefe.email === req.body.username){
                    Usuario_on = doc
                    req.session.user = doc.jefe.email;
                    res.redirect("/");
                }else{
                    res.render("login", {warning:"error al iniciar sesion"})
                }
            } catch (error) {
                console.log(error)
            }
        })
    }
})
app.get("/equipos", (req, res)=>{

    if(req.session.user == undefined){
        res.redirect("/login")
    }else{
        console.log(Usuario_on.nombre)
        let pcs = null;
        dep_model.findOne({nombre: Usuario_on.nombre}, (err, doc)=>{
            pcs = doc
            res.render("equipos.ejs", {info: doc})   
        })
        console.log(pcs)
        
    }
})
