import React, { useState, useEffect } from 'react';
import '../styles/forum.css';

function Forum() {
    /*TO DO:
        -method to filter threads based on likes or some other metrics
        -threads array needs to pull from server database
    */


    //creates a state that holds an array of all threads
    const [threads, setThreads] = useState([]);

    //method to add a thread to threads array
    function addThread(name, message, setName, setMessage) {
        //make sure thread is not empty...
        if (name === '' || message === '') {
            alert('Must name thread and fill out description!');
            return;
        }

        const date = new Date();
        const key = name + ' ' + date.getTime();
        let newThread = <Thread key={key} name={name} message={message} createdOn={date}/>;
        setThreads(threads.concat([newThread]));
        setName(''); //resets input field for name of thread to be place-holder text 
        setMessage(''); //same but for message of thread
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
        
     */

    const [name, setName] = useState(''); //state to store name of thread
    const [message, setMessage] = useState(''); //state to store message of thread

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
                onClick={() => props.createThread(name, message, setName, setMessage)}
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
        -allow possibility to add subcomments
        -make it so user can only like or unlike, not keep adding likes
    */

    const [likes, setLikes] = useState(0);
    const [time, setTime] = useState('Just now');
    const createdOn = props.createdOn;
    const min = 60 * 1000;
    const hour = min * 60;
    const day = hour * 24;
    const week = day * 7;
    const max = week + day;
    let dateTimer = setInterval(tick, 1000);
    //var [subComments, setSubComments] = useState([]);

    //handles created '[some time] ago' message at bottom of forum
    function tick() {
        const now = new Date();
        const diff = now - createdOn;
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
        setTime(message);
    }

    //note: div instead of a react.fragment so that wrapper for the thread can be stylized
    return (
        <div className="thread">
            <div className="thread-name">{props.name}</div>
            <button className="reply-button">Reply</button>
            <button className="like-button" onClick={()=> setLikes(likes+1)}>Like</button>
            <div className="likes">{likes}</div>
            <p>{props.message}</p>
            <p>{time}</p>
        </div>
    );
}

export default Forum;