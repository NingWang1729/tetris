import React, { useState, useEffect } from 'react';
import '../styles/forum.css';

/* TO-DO (general ideas): 
    -create commentA and commentB stack to allow continual subcommenting
    -generalize threads, commentA and commentB into one functional component decleration
*/
const BACKEND_PORT = "https://e1d7f15e6973.ngrok.io";

//returns message displaying how old a date is
function howOld(createdOn) {
    // Time constants
    const created = createdOn;
    const min = 60 * 1000;
    const hour = min * 60;
    const day = hour * 24;
    const week = day * 7;
    const max = week + day;

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
        case diff < max:
            message = '1 week ago';
            break;
        default:
            message = createdOn;
            break;
    }
    return(message);
}

function Forum() {
    /*TO DO:
        -method to filter threads based on likes or some other metrics
        -threads array needs to pull from server database
    */

    // Creates a state that holds an array of all threads
    const [threads, setThreads] = useState([]);

    // Retrieves previous posts from backend
    useEffect(() => {
        fetch(`${BACKEND_PORT}/forum_posts`)
            .then((response) => {
                response.json().then((data) => {
                    let old_posts = [];
                    for (let i = 0; i < data.length; i++) {
                        console.log(data[i]);
                        let post_name = data[i].name;
                        let post_message = data[i].message;
                        let likes = data[i].likes;
                        let date = data[i].date;
                        date = new Date(date);
                        let key = post_name + ' ' + date.getTime();
                        let newThread = <Thread key={key} name={post_name} message={post_message} likes={likes} createdOn={date}/>;
                        old_posts.push(newThread);
                    }
                    setThreads(old_posts);
                });
            });
    }, []);

    //method to add a thread to threads array
    function addThread(name, message) {
        //make sure thread is not empty...
        if (name === '' || message === '') {
            alert('Must name thread and fill out description!');
            return;
        }

        const date = new Date();
        const key = name + ' ' + date.getTime();
        let newThread = <Thread key={key} name={name} message={message} likes={0} createdOn={date}/>;
        setThreads(threads.concat([newThread]));
    }

    return (
        <React.Fragment>
            <CreateNewThread createThread={addThread}/>
            {threads}
        </React.Fragment>
    );
}

//UI to get user input for creating new threads, calls Forum.addThread() w/ given information
function CreateNewThread(props) {
    /*TO DO:
        -make it look nice
     */

    const [name, setName] = useState(''); //state to store name of thread
    const [message, setMessage] = useState(''); //state to store message of thread

    // Post Request To Backend
    function handleSubmit(e, thread_name, thread_message) {
        e.preventDefault();
        console.log("sent request")
        props.createThread(name, message);
        const data = { 
            "thread_name": thread_name,
            "thread_message" : thread_message 
        };
        fetch(`${BACKEND_PORT}/forum_posts/`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        setName('');
        setMessage('');
    }

    /* Returns 2 input fields where user can input information about thread
    and a button that calls method to create a thread */
    return (
        <form>
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
                type="submit"
                className="create-thread-btn"
                onClick={(e) => handleSubmit(e, name, message)}
            >
                Create New Thread
            </button>
        </form>
    );
}

//The UI for a thread
function Thread(props) {
    /*TO DO:
        -create a 'posted by: user_name' message for threads
        -make subcomments dynamic
        -make it so user can only like or unlike, not keep adding likes
        -make tick function server dependent. Currently clocks tick out of sync b/c they are a porperty of the thread itself
    */

    const [likes, setLikes] = useState(props.likes);
    const [time, setTime] = useState('Just now');
    const [comments, setComments] = useState([]);

    const createdOn = props.createdOn;
    let dateTimer = setInterval(tick, 1000);
    function tick() {
        setTime(howOld(createdOn));
    }

    function addComment(name, message) {
        //make sure comment is not empty...
        if (name === '' || message === '') {
            alert('Must name comment and fill out description!');
            return;
        }

        const date = new Date();
        const key = name + ' ' + date.getTime();
        let newComment = <SubCommentA key={key} name={name} message={message} createdOn={date}/>;
        setComments(comments.concat([newComment]));
    }

    //note: div instead of a react.fragment so that wrapper for the thread can be stylized
    return (
        <div className="thread">
            <div className="thread-name">{props.name}</div>
            <button className="reply-button" onClick={()=> addComment('adam', 'test comment')}>Reply</button>
            <button className="like-button" onClick={()=> setLikes(likes+1)}>Like</button>
            <div className="likes">{likes}</div>
            <p>{props.message}</p>
            {comments}
            <p>{time}</p>
        </div>
    );
}

//UI for a subcomment
function SubCommentA(props) {
    const [likes, setLikes] = useState(0);
    const [time, setTime] = useState('Just now');

    const createdOn = props.createdOn;
    let dateTimer = setInterval(tick, 1000);
    function tick() {
        setTime(howOld(createdOn));
    }

    return (
        <div className="comment">
            <div className="comment-name">{props.name}</div>
            <div className="comment-message">{props.message}</div>
            <div>{time}</div>
        </div>
    );
}

export default Forum;