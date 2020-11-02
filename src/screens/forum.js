import React, { useState, useEffect } from 'react';
import '../styles/forum.css';

function Forum() {
    /*TO DO:
        -method to allow user to decide thread title and content instead of static test example
        -method to filter threads based on likes or some other metrics
        -threads state needs to pull all stored threads from server database
    */


    //creates a state that holds an array of all threads
    var [threads, setThreads] = useState([]);
    //var [newThreadName, setNewThreadName] = useState(null);
    //var [newThreadMessage, setNewThreadMessage] = useState(null);

    //method to add a thread to threads array
    function addThread(name, message) {
        let newThread = <Thread name={name} message={message}/>;
        setThreads(threads.concat([newThread]));
    }

    return (
        <React.Fragment>
            <button className="create-thread-btn" onClick={()=> addThread('test', 'this is a test')}>
                Create New Thread
            </button>
            <Thread name="Adam Muzzarelli's First Thread" message="Mr. Yang I love your Tetris game"/>
            {threads}
        </React.Fragment>
    );
}

/*function CreateNewThread(props) {
    return (
        <div>
            <input type="text" placeholder="Thread Name" className="create-thread-input"/>
            <input type="text" placeholder="Thread Message" className="create-thread-input"/>
            <button className="create-thread-btn">Create New Thread</button>
        </div>
    );
}*/

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