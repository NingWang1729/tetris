var http = require("http");
const PORT = 5000;


http.createServer((req, res) =>{
    console.log("Running Server at port ",{PORT})
}).listen(PORT);