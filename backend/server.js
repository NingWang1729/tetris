const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
// var http = require("http");



app.get('/', (req, res) =>{
    res.send('Hello World!');
});



app.listen(PORT, () => {
    console.log("Running Server at port ",{PORT});
});

// http.createServer((req, res) =>{
//     console.log("Running Server at port ",{PORT})
// }).listen(PORT);