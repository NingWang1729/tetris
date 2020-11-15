const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Name, Message, Date, Likes
var forum_posts_json = [
    {name : 'C++', message : 'hello', likes : 1, date : "Fri Nov 13 2020 18:01:30 GMT-0800 (Pacific Standard Time)"},
    {name : 'JavaScript', message : 'console.log("Hello World");', likes : 3, date : "Tues Nov 10 2020 18:01:30 GMT-0800 (Pacific Standard Time)"},
    {name : 'Python', message : 'print("Hello World")', likes : 2, date : "Sat Nov 14 2020 18:01:30 GMT-0800 (Pacific Standard Time)"},
];
var forum_posts = JSON.stringify(forum_posts_json);
                

app.get('/', (req, res) => {
    res.send("Hello world!");
})

app.get('/post/:id', (req, res) => {
    res.send(forum_posts_json[req.params.id - 1]);
});

app.get('/forum_posts/', function(req, res){
    res.send(forum_posts);
});

app.post('/forum_posts/', function(req, res){
    response = {
        thread_name : req.body.thread_name,
        thread_message : req.body.thread_message
    };
    forum_posts_json.push({ name : req.body.thread_name, message : req.body.thread_message, likes: 0, date: new Date()})
    forum_posts = JSON.stringify(forum_posts_json)
    console.log(forum_posts_json);
    res.end(JSON.stringify(response));
});

app.listen(PORT, () => {
    console.log("Running Server at port ",{PORT});
});