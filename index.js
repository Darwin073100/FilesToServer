const express = require('express');
const multer = require('multer');
const mimeTypes = require('mime-types');
const fs = require('fs');

const app = express();

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, res, cb)=>{
        cb('',Date.now() + '.' + mimeTypes.extension(res.mimetype));
    }
});

const upload = multer({
    storage
});

app.get('/download/:name',(req, res)=>{
    const { name } = req.params;
    res.sendFile(__dirname+'/uploads/'+ name);
})

app.post('/upload/',upload.single('avatar'),(req, res)=>{
    res.send({
        message: 'Correct'
    });
})

app.delete('/delete/:name', (req, res)=>{
    const { name } = req.params;
    fs.unlink(__dirname+'/uploads/'+name,(r)=>{
        res.send({message: r});
    })
});



app.listen(3001);