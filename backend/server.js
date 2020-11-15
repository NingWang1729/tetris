const express = require('express');
const bodyParser = require("body-parser");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'BeetrootSoup',
    database : 'gaming_arcade'
});

app.get('/', (req, res) => {
    res.send("Hello world!");
})

app.get('/post/:id', (req, res) => {
    res.send(forum_posts_json[req.params.id - 1]);
});

app.get('/forum_posts/', function(req, res){
    connection.query(`SELECT * FROM forum_posts`,(error, results)=>{
        console.log(results);
        var forum_posts = [];
        for (let i = 0; i < results.length; i++) {
            let post = { id : results[i].id, name : results[i].name, message : results[i].message, likes : results[i].likes, date : results[i].post_date};
            forum_posts.push(post);
        }
        var forum_posts_json = JSON.stringify(forum_posts);
        console.log(forum_posts_json);
        res.send(forum_posts_json);
    });
});

app.post('/forum_posts/', function(req, res){
    response = {
        thread_name : req.body.thread_name,
        thread_message : req.body.thread_message
    };
    connection.query(`INSERT INTO forum_posts (name, message) VALUES ('${req.body.thread_name}', '${req.body.thread_message}')`,(error, results)=>{
        console.log(error);
        console.log(results);
    });
    res.end(JSON.stringify(response));
});

app.listen(PORT, () => {
    console.log("Running Server at port ",{PORT});
});