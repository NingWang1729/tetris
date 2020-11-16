// IGNORE
// This file was for set up purposes only

// OLD VERSION
// Name, Message, Date, Likes
// var forum_posts_json = [
//     {id : 1, name : 'C++', message : 'hello', likes : 1, date : "Fri Nov 13 2020 18:01:30 GMT-0800 (Pacific Standard Time)"},
//     {id : 2, name : 'JavaScript', message : 'console.log("Hello World");', likes : 3, date : "Tues Nov 10 2020 18:01:30 GMT-0800 (Pacific Standard Time)"},
//     {id : 3, name : 'Python', message : 'print("Hello World")', likes : 2, date : "Sat Nov 14 2020 18:01:30 GMT-0800 (Pacific Standard Time)"},
// ];
// var forum_posts = JSON.stringify(forum_posts_json);


/*
CREATE TABLE forum_posts(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL DEFAULT "An interesting title",
    message varchar(255) NOT NULL DEFAULT "Bottom Text",
    likes INT NOT NULL DEFAULT 0,
    post_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);
*/

/*
CREATE TABLE tetris_leaderboard(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    score INT NOT NULL DEFAULT 0,
    post_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
);
*/

/*  ONE TIME INSERT
    var forum_posts_sql = [
        [1, 'C++', 'hello', 1, '2020-11-11 18:12:46'],
        [2, 'JavaScript', 'console.log("Hello World");', 3, '2020-11-12 17:23:21'],
        [3, 'Python', 'print("Hello World")', 2, '2020-11-14 12:46:34'],
    ];

    connection.query('INSERT INTO forum_posts (id, name, message, likes, post_date) VALUES ?', [forum_posts_sql], function(err, result) {
    console.log(err);
    console.log(result);
    });
*/

/*  OLD VERSION
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
*/