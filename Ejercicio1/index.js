const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = 8080;
const multer = require('multer');
const mimeTypes = require('mime-types');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) =>{
        cb("",`${Date.now()}.${mimeTypes.extension(file.mimetype)}`);
    }
});

const upload = multer({
    storage
});

app.get("/", (req, res)=>{
    res.sendFile(__dirname +"/views/index.html");
});

app.post("/", upload.single('uploads'), (req, res)=>{
    res.send("Se subió el archivo");
});

const server = http.listen(port, ()=>{
    console.log(`Server on port: ${port}`);
});