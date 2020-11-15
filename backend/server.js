const express = require('express');
const path = require('path');

const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Name, Message, Date, Likes
const forum_posts = [
                    ['C++', 'stdout<<"Hello World;"', 1, "Fri Nov 13 2020 18:01:30 GMT-0800 (Pacific Standard Time)"],
                    ['Python', 'print("Hello World")', 2, "Sat Nov 14 2020 18:01:30 GMT-0800 (Pacific Standard Time)"],
                    ['JavaScript', 'console.log("Hello World");', 3, "Tues Nov 10 2020 18:01:30 GMT-0800 (Pacific Standard Time)"]
                ];


app.get('/', (req, res) => {
    res.send("Hello world!");
})

app.get('/post/:id', (req, res) => {
    res.send(forum_posts[req.params.id - 1]);
});

app.get('/forum_posts/', function(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(forum_posts);
});

app.post('/forum_posts/', function(req, res){
    response = {
        thread_name : req.body.thread_name,
        thread_message : req.body.thread_message
    };
    // forum_posts.push({'thread_name': req.body.thread_name, 'thread_message': req.body.thread_message})
    forum_posts.push([req.body.thread_name, req.body.thread_message])
    console.log(forum_posts);
    res.redirect('http://localhost:3000/forum');
    res.end(JSON.stringify(response));
});

app.listen(PORT, () => {
    console.log("Running Server at port ",{PORT});
});