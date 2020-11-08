import React, { useState, useEffect } from 'react';
import '../styles/forum.css';

//returns message displaying how old a date is
function howOld(createdOn) {
    //time constants
    const created = createdOn;
    const min = 60 * 1000;
    const hour = min * 60;
    const day = hour * 24;
    const week = day * 7;
    const max = week + day;

    //handles created '[some time] ago' message
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


    //creates a state that holds an array of all threads
    const [threads, setThreads] = useState([]);

    //method to add a thread to threads array
    function addThread(name, message) {
        //make sure thread is not empty...
        if (name === '' || message === '') {
            alert('Must name thread and fill out description!');
            return;
        }

        const date = new Date();
        const key = name + ' ' + date.getTime();
        let newThread = <Thread key={key} name={name} message={message} createdOn={date}/>;
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

    function handleClick() {
        props.createThread(name, message);
        setName('');
        setMessage('');
    }

    /*returns 2 input fields where user can input information about thread
    and a button that calls method to create a thread*/
    return (
        <div>
            <input 
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Thread Name"
                className="create-thread-input"
            />
            <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Thread Message"
                className="create-thread-input"
            />
            <button
                onClick={() => handleClick()}
                className="create-thread-btn"
            >
                Create New Thread
            </button>
        </div>
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

    const [likes, setLikes] = useState(0);
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