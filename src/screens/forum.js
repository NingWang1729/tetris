import React, { useState, useEffect } from 'react';
import '../styles/forum.css';

function Forum() {
    /*TO DO:
        -method to filter threads based on likes or some other metrics
        -threads state needs to pull all stored threads from server database
    */


    //creates a state that holds an array of all threads
    const [threads, setThreads] = useState([]);

    //method to add a thread to threads array
    function addThread(name, message, setName, setMessage) {
        let newThread = <Thread name={name} message={message}/>;
        setThreads(threads.concat([newThread]));
        setName(''); //resets input field for name of thread to be place-holder text 
        setMessage(''); //same but for message of thread
    }

    return (
        <React.Fragment>
            <CreateNewThread createThread={addThread}/>
            <Thread name="Adam Muzzarelli's First Thread" message="Mr. Yang I love your Tetris game"/>
            {threads}
        </React.Fragment>
    );
}

function CreateNewThread(props) {
    /*TO DO:
        -prevent creation of thread unless name and message is given a non empty string value
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

function Thread(props) {
    /*TO DO:
        -create a 'posted by: user_name' message for threads
        -create a time stamp of when thread was created
        -allow possibility to add subcomments
        -make it so user can only like or unlike, not keep adding likes
    */
   
    var [likes, setLikes] = useState(0);
    //var [subComments, setSubComments] = useState([]);

    //note: div instead of a react.fragment so that wrapper for the thread can be stylized
    return (
        <div className="thread">
            <div className="thread-name">{props.name}</div>
            <button className="reply-button">Reply</button>
            <button className="like-button" onClick={()=> setLikes(likes+1)}>Like</button>
            <div className="likes">{likes}</div>
            <p>{props.message}</p>
        </div>
    );
}

export default Forum;