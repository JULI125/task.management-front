const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();

//Libraries WebSocket
const { createServer } = require("http");
const { Server } = require("socket.io");

require('dotenv').config();

//Middewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'static')));

//variables
app.set('PORT', process.env.PORT || 4052);


const httpServer = createServer(app);
const io = new Server(httpServer,{/* Opciones */})

let tareas = [];

app.get('/task', (req, res) => {
    res.send(JSON.stringify(tareas))
})

app.post('/task', (req, res) => {
    let tarea = req.body;
    tareas.push(tarea);
    res.send(JSON.stringify('Se hizo la conexion del post de tareas'))
    console.log(tareas);
})

app.delete('/task', (req, res) => {
    let tarea = req.body;
    res.send(JSON.stringify('Se elimino las de tareas'))
    console.log(tarea);
})

app.get('/registro', (req, res) => {
    res.send(JSON.stringify(registro))
})

app.post('/registro', (req, res) => {
    let register = req.body;
    tareas.push(register);
    res.send(JSON.stringify('Se hizo la conexion del post de registro'))
    console.log(register);
})

app.get('', (req,res) => {
    res.sendFile(path.join(__dirname,"./static/html/login.html"))
})

io.on("connection", socket => {
    socket.on('room',(room)=>{
        socket.join(room);
    })

    socket.on('chat:message', data => {
        //Compartir mensaje a otros usuarios
        io.emit('chat:message', data);
        // io.to(data.room).emit("chat:message",data);
    })
    

    socket.on("disconnect", () => {
        console.log('Me desconecté',socket.id); // false
    });
});

httpServer.listen(app.get('PORT'), () => {
    console.log(`server running in port: ${app.get('PORT')}`)
})
