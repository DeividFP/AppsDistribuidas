const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = 8080;
const io = require('socket.io')(http);
const QRCode = require('qrcode');

app.get("/", (req, res)=>{
    res.sendFile(__dirname +"/views/index.html");
});

io.sockets.on('connect', (socket)=>{
    socket.on('reqQR', (empleado, nombre, escuela) => {
        QRCode.toDataURL(`Número de empleado: ${empleado}, Nombre: ${nombre}, Escuela: ${escuela}`, (err, url) => {
            if(err) throw err;
            socket.emit('resQR', url);
        });
    });
});

const server = http.listen(port, ()=>{
    console.log(`Server on port: ${port}`);
});