const express = require('express');
const socket = require('socket.io');

//app setup
const app = express();
app.use(express.json());
app.use(express.static('public'));
var server = app.listen(3000, () => console.log('listening on port 3000...'));

//socket setup
const io = socket(server);

//file setup
const fs = require('fs');

let sample;

fs.readFile('sample.json',(err, data) => {
    if (err) throw err;
    sample = JSON.parse(data);
});

//event
io.on('connection', function(socket) {  
    console.log('New client connected...');


    socket.on('search', function(data){
        const item = sample.find(c => c.id === parseInt(data.id))
        socket.emit('search',item);
    });


    socket.on('add',function(data){
        sample.push({id: parseInt(data.id), name : data.name, gender: data.gender,
                        faculty: data.faculty, year: data.year});
        io.sockets.emit('add',data);

        let write = JSON.stringify(sample, null, 2);  
        fs.writeFileSync('sample.json', write); 
    });

 

    
});







