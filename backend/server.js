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
    connection.query(`SELECT * FROM forum_posts WHERE id = ${req.params.id}`, (error, results)=>{
        let post = { id : results[0].id, name : results[0].name, message : results[0].message, likes : results[0].likes, date : results[0].post_date};
        console.log(`Sent post ${post} to /post/${post.id}`);
        res.send(post);
    });
});

app.post('/post/:id', (req, res) => {
    console.log(req.params.id, req.body.likes);
    connection.query(`UPDATE forum_posts SET likes = ${req.body.likes} WHERE id = ${req.params.id}`, (error, results) => {
        console.log(error);
        console.log(results);
    });
    res.end();
});

app.post('/comment/:id', (req, res) => {
    console.log(req.params.id, req.body.likes);
    connection.query(`UPDATE forum_comments SET likes = ${req.body.likes} WHERE id = ${req.params.id}`, (error, results) => {
        console.log(error);
        console.log(results);
    });
    res.end();
});

app.get('/forum_posts/', (req, res) => {
    connection.query(`SELECT * FROM forum_posts`,(error, results)=>{
        let forum_posts = [];
        for (let i = 0; i < results.length; i++) {
            let post = { id : results[i].id, name : results[i].name, message : results[i].message, likes : results[i].likes, date : results[i].post_date};
            forum_posts.push(post);
        }
        res.send(forum_posts);
    });
});

app.get('/forum_posts_by_likes/', (req, res) => {
    connection.query(`SELECT * FROM forum_posts ORDER BY likes DESC`,(error, results)=>{
        let forum_posts = [];
        for (let i = 0; i < results.length; i++) {
            let post = { id : results[i].id, name : results[i].name, message : results[i].message, likes : results[i].likes, date : results[i].post_date};
            forum_posts.push(post);
        }
        res.send(forum_posts);
    });
});

app.get('/forum_posts_by_new/', (req, res) => {
    connection.query(`SELECT * FROM forum_posts ORDER BY post_date DESC`,(error, results)=>{
        let forum_posts = [];
        for (let i = 0; i < results.length; i++) {
            let post = { id : results[i].id, name : results[i].name, message : results[i].message, likes : results[i].likes, date : results[i].post_date};
            forum_posts.push(post);
        }
        res.send(forum_posts);
    });
});

app.post('/forum_posts/', (req, res) => {
    connection.query(`INSERT INTO forum_posts (name, message) VALUES ('${req.body.thread_name}', '${req.body.thread_message}')`,(error, results)=>{
        console.log(error);
        console.log(results);
    });
    res.end();
});

app.get('/forum_comments/', (req, res) => {
    connection.query(`SELECT * FROM forum_comments`,(error, results)=>{
        let forum_comments = [];
        for (let i = 0; i < results.length; i++) {
            let post = { id : results[i].id, name : results[i].name, message : results[i].message, likes : results[i].likes, date : results[i].post_date, post_id : results[i].post_id};
            forum_comments.push(post);
        };
        res.send(forum_comments);
    });
});

app.post('/forum_comments/', (req, res) => {
    connection.query(`INSERT INTO forum_comments (name, message, post_id) VALUES ('${req.body.comment_name}', '${req.body.comment_message}', '${req.body.post_id}')`,(error, results)=>{
        console.log(error);
        console.log(results);
    });
    res.end();
});

app.get('/tetris_leaderboard/', (req, res) => {
    connection.query(`SELECT * FROM tetris_leaderboard ORDER BY score DESC LIMIT 10`,(error, results)=>{
        let forum_posts = [];
        for (let i = 0; i < results.length; i++) {
            let post = { id : results[i].id, score : results[i].score, date : results[i].post_date};
            forum_posts.push(post);
        }
        res.send(forum_posts);
    });
});

app.post('/tetris_leaderboard/', (req, res) => {
    connection.query(`INSERT INTO tetris_leaderboard (score) VALUES ('${req.body.score}')`,(error, results)=>{
        console.log(error);
        console.log(results);
    });
    res.end();
});

app.listen(PORT, () => {
    console.log("Running Server at port ",{PORT});
});