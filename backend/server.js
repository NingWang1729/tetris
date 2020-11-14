const express = require('express');
const path = require('path');

const bodyParser = require("body-parser");
// const router = express.Router();
// const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use(cors);

const PORT = process.env.PORT || 5000;

const forum_posts = [
                "This is a message 1",
                "This is a message 2"
                ];


app.get('/', (req, res) => {
    res.send("Hello world!");
})

app.get('/post/:id', (req, res) => {
    res.send(forum_posts[req.params.id - 1]);
});

app.get('/forum_posts/', function(req, res){
    res.send(forum_posts);
});

app.post('/forum_posts/', function(req, res){
    response = {
        thread_name : req.body.thread_name,
        thread_message : req.body.thread_message
    };
    forum_posts.push([req.body.thread_name, req.body.thread_message])
    console.log(forum_posts);
    // res.redirect('http://localhost:3000/forum');
    res.end(JSON.stringify(response));
});

app.listen(PORT, () => {
    console.log("Running Server at port ",{PORT});
});