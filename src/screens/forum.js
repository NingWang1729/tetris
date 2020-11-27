import React, { useState, useEffect } from 'react';
import { createRenderer } from 'react-dom/test-utils';
import '../styles/forum.css';

/* TO-DO (general ideas): 
    -create commentA and commentB stack to allow continual subcommenting
    -generalize threads, commentA and commentB into one functional component decleration
*/

function Forum(port_to_backend) {
    // Port to backend server
    const BACKEND_PORT = port_to_backend;
    // Creates a state that holds an array of all threads
    const [threads, setThreads] = useState([]);
    // Retrieves data from backend
    useEffect(() => {
        fetch(`${BACKEND_PORT}/forum_posts`)
            .then((response) => {
                response.json().then((data) => {
                    let old_posts = [];
                    for (let i = 0; i < data.length; i++) {
                        let id = data[i].id;
                        let post_name = data[i].name;
                        let post_message = data[i].message;
                        let likes = data[i].likes;
                        let date = data[i].date;
                        date = new Date(date);
                        let key = id + '' + date;
                        
                        let newThread = <Thread key={key} id={id} name={post_name} message={post_message} likes={likes} createdOn={date}/>;
                        old_posts.push(newThread);
                    }
                    setThreads(old_posts);
                });
            });
    }, []);

    //UI to get user input for creating new threads, calls Forum.addThread() w/ given information
    function ForumManager(props) {
        const [name, setName] = useState(''); //state to store name of thread
        const [message, setMessage] = useState(''); //state to store message of thread

        // Post Request To Backend
        function handleSubmit(e, thread_name, thread_message) {
            e.preventDefault();
            props.createThread(name, message);
            if (thread_name === '' || thread_message === '') {
                console.log("User attempted to post an empty thread...");
                return false;
            } else {
                console.log("User posted a thread...");
            }
            let data = { 
                "thread_name": thread_name,
                "thread_message" : thread_message 
            };
            fetch(`${BACKEND_PORT}/forum_posts/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            setName('');
            setMessage('');
        }

        /* Returns 2 input fields where user can input information about thread
        and a button that calls method to create a thread */
        return (
            <form className="forum-manager">
                <input 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Thread Name"
                    className="create-thread-input"
                    name="thread_name"
                />
                <input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Thread Message"
                    className="create-thread-input"
                    name="thread_message"
                />
                <button
                    type="button"
                    className="create-thread-btn"
                    onClick={(e) => handleSubmit(e, name, message)}
                >
                    Create Post
                </button>
                <button
                    type="button"
                    className="sort-by-likes-btn"
                    onClick={(e) => sortByLikes(e)}
                >
                    Sort by Likes
                </button>
                <button
                    type="button"
                    className="sort-by-new-btn"
                    onClick={(e) => sortByNew(e)}
                >
                    Sort by New
                </button>
                <button
                    type="button"
                    className="dev-button"
                    onClick={(e) => runDevelopment(e)}
                >
                    Dev Button
                </button>
            </form>
        );
    }

    //  Loads comments from backend according to highest number of likes
    function sortByLikes(e) {
        e.preventDefault();
        console.log("User is sorting posts by likes...");
        fetch(`${BACKEND_PORT}/forum_posts_by_likes/`)
            .then((response) => {
                response.json().then((data) => {
                    let old_posts = [];
                    for (let i = 0; i < data.length; i++) {
                        let id = data[i].id;
                        let post_name = data[i].name;
                        let post_message = data[i].message;
                        let likes = data[i].likes;
                        let date = data[i].date;
                        date = new Date(date);
                        
                        let newThread = <Thread id={id} name={post_name} message={post_message} likes={likes} createdOn={date}/>;
                        old_posts.push(newThread);
                    }
                    setThreads(old_posts);
                });
            })
    };

    //  Loads comments from backend according to reverse chronological order
    function sortByNew(e) {
        e.preventDefault();
        console.log("User is sorting posts by new...")
        fetch(`${BACKEND_PORT}/forum_posts_by_new/`)
            .then((response) => {
                response.json().then((data) => {
                    let old_posts = [];
                    for (let i = 0; i < data.length; i++) {
                        let id = data[i].id;
                        let post_name = data[i].name;
                        let post_message = data[i].message;
                        let likes = data[i].likes;
                        let date = data[i].date;
                        date = new Date(date);
                        
                        let newThread = <Thread id={id} name={post_name} message={post_message} likes={likes} createdOn={date}/>;
                        old_posts.push(newThread);
                    }
                    setThreads(old_posts);
                });
            })
    };

    //  React Component for threads
    function Thread(props) {
        /*TO DO:
            -create a 'posted by: user_name' message for threads
            -make subcomments dynamic
            -make it so user can only like or unlike, not keep adding likes
            -make tick function server dependent. Currently clocks tick out of sync b/c they are a porperty of the thread itself
        */

        const [likes, setLikes] = useState(props.likes);
        const [time, setTime] = useState('Loading...');
        const [comments, setComments] = useState([]);
        const [showAddCommentField, setVisibility] = useState(false);

        useEffect(() => {
            fetch(`${BACKEND_PORT}/forum_comments/`)
                .then((response) => {
                    response.json().then((data) => {
                        let old_comments = [];
                        for (let i = 0; i < data.length; i++) {
                            //make sure comment belongs in this thread
                            if (data[i].post_id === props.id) {
                                // Retrieve data from backend
                                let id = data[i].id;
                                let name = data[i].name;
                                let message = data[i].message;
                                let likes = data[i].likes;
                                let date = data[i].date;
                                date = new Date(date);
                                let post_id = data[i].post_id;
                                let key = name + '' + date.getTime();
                                //create comment
                                let comment = <SubCommentA key={key} id={id} name={name} message={message} createdOn={date} likes={likes} post_id={post_id}/>;
                                old_comments.push(comment);
                            }
                        }
                        setComments(old_comments);
                    });
                });
        }, []);

        const createdOn = props.createdOn;
        setTimeout(tick, 1000);
        //let clock = setInterval(tick, 1000);
        function tick() {
            setTime(howOld(createdOn));
        }

        function addLike() {
            fetch(`${BACKEND_PORT}/post/${props.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ likes : likes + 1 })
            });
            setLikes(likes + 1);
        };

        function addComment(name, message) {
            //make sure comment is not empty...
            if (name === '' || message === '') {
                alert('Must name comment and fill out description!');
                return;
            } else {
                console.log("User has added a comment...");
            }
            const date = new Date();
            const key = name + ' ' + date.getTime();
            let newComment = <SubCommentA key={key} name={name} message={message} createdOn={date} likes={0} post_id={props.id}/>;
            setComments(comments.concat([newComment]));
        }

        // note: div instead of a react.fragment so that wrapper for the thread can be stylized
        return (
            <div className="thread" id={props.id}>
                <div className="thread-name">{props.name}</div>
                <button className="reply-button" onClick={()=> setVisibility(true)}>Reply</button>
                <button className="like-button" onClick={addLike}>Like</button>
                <div className="likes">{likes}</div>
                <p>{props.message}</p>
                {comments}
                {showAddCommentField ? <CreateSubCommentForm createComment={addComment} post_id={props.id} hide={() => setVisibility(false)}/> : null}
                <p>{time}</p>
            </div>
        );
    }

    //  Function to add a thread to threads array
    function addThread(name, message) {
        //make sure thread is not empty...
        if (name === '' || message === '') {
            alert("Name and message cannot be empty!");
            return;
        } else {
            console.log("User has added a thread...");
        };

        const date = new Date();
        let newThread = <Thread id={threads.length + 1} name={name} message={message} likes={0} createdOn={date}/>;
        setThreads(threads.concat([newThread]));
    }

    //  React Component for a subcomment
    function SubCommentA(props) {
        const [likes, setLikes] = useState(props.likes);
        const [time, setTime] = useState('Loading...');
        const createdOn = props.createdOn;
        function tick() {
             setTime(howOld(createdOn));
        }
        setTimeout(tick, 1000);
        function addLike() {
            fetch(`${BACKEND_PORT}/comment/${props.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ likes : likes + 1 })
            });
            setLikes(likes + 1);
        };
        return (
            <div className="comment" post_id={props.post_id}>
                <div className="comment-name">{props.name}</div>
                <button className="like-button" onClick={addLike}>Like</button>
                <div className="likes">{likes}</div>
                <div className="comment-message">{props.message}</div>
                <p>{time}</p>
            </div>
        );
    };

    //  UI for creating-sub-comment form
    function CreateSubCommentForm(props) {
        //state to store message of the comment
        const [message, setMessage] = useState('');

        function handleSubmit(e, comment_message) {
            e.preventDefault();
            //need to change this from 'Adam' to User_ID or something similar
            props.createComment('Anonymous', message);
            // start
            if (comment_message === '') {
                console.log("User attempted to comment an empty comment...");
                return false;
            } else {
                console.log("Comment is valid...");
            }
            let data = {
                comment_name: 'Anonymous',
                comment_message : comment_message,
                post_id : props.post_id
            };
            console.log(data);
            fetch(`${BACKEND_PORT}/forum_comments/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            // end
            props.hide();
            setMessage('');
        }

        return (
            <form>
                <input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Comment Message"
                    name="thread_message"
                />
                <button
                    type="submit"
                    //className="*need comment-button class*"
                    onClick={(e) => handleSubmit(e, message)}
                >
                    Comment
                </button>
                <button
                    type="submit"
                    onClick={() => props.hide()}
                >
                    Cancel
                </button>
            </form>
        );
    }

    //returns message displaying how old a date is
    function howOld(createdOn) {
        // Time constants
        const created = createdOn;
        const min = 60 * 1000;
        const hour = min * 60;
        const day = hour * 24;
        const week = day * 7;
        const week2 = week * 2;
        const week3 = week * 3;
        const week4 = week * 4;
        const max = week * 5;

        // Handles created '[some time] ago' message
        const now = new Date();
        const diff = now - created;
        let message = '';
        switch (true) {
            case diff < min:
                message = Math.floor(diff/1000) + ' seconds ago';
                break;
            case diff < hour:
                message = Math.floor(diff/min) + ' minutes ago';
                break;
            case diff < day:
                message = Math.floor(diff/hour) + ' hours ago';
                break;
            case diff < week:
                message = Math.floor(diff/day) + ' days ago';
                break;
            case diff < week2:
                message = '1 week ago';
            case diff < week3:
                message = '2 weeks ago';
            case diff < week4:
                message = '3 weeks ago';
            case diff < max:
                message = '4 weeks ago';
                break;
            default:
                let month;
                switch (created.getMonth()) {
                    case 0:
                        month = 'January';
                        break;
                    case 1:
                        month = 'February';
                        break;
                    case 2:
                        month = 'March';
                        break;
                    case 3:
                        month = 'April'
                        break;
                    case 4:
                        month = 'May'
                        break;
                    case 5:
                        month = 'June'
                        break;
                    case 6:
                        month = 'July'
                        break;
                    case 7:
                        month = 'August'
                        break;
                    case 8:
                        month = 'September'
                        break;
                    case 9:
                        month = 'October'
                        break;
                    case 10:
                        month = 'November'
                        break;
                    case 11:
                        month = 'December'
                        break;
                }
                message = month + ' ' + created.getDate() + ' ' + created.getFullYear();
                break;
        }
        return(message);
    }

    // Use to test builds in development
    function runDevelopment() {
        alert("Running Development...");
    }

    // Returns Forum
    return (
        <React.Fragment>
            {/* <br/> */}
            <ForumManager createThread={addThread}/>
            <br/>
            <br/>
            <br/>
            <br/>
            {/* <br/> */}
            {threads}
        </React.Fragment>
    );
}



export default Forum;