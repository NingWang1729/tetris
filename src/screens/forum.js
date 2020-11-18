import React, { useState, useEffect } from 'react';
import '../styles/forum.css';

/* TO-DO (general ideas): 
    -create commentA and commentB stack to allow continual subcommenting
    -generalize threads, commentA and commentB into one functional component decleration
*/

function Forum(port_to_backend) {
    /*TO DO:
        -method to filter threads based on likes or some other metrics
        -threads array needs to pull from server database
    */

    // Port to backend server
    const BACKEND_PORT = port_to_backend;
    
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
        let newThread = <Thread id={threads.length + 1} name={name} message={message} likes={0} createdOn={date}/>;
        setThreads(threads.concat([newThread]));
    }

    //UI to get user input for creating new threads, calls Forum.addThread() w/ given information
    function ForumManager(props) {
        /*TO DO:
            -make it look nice
        */

        const [name, setName] = useState(''); //state to store name of thread
        const [message, setMessage] = useState(''); //state to store message of thread

        // Post Request To Backend
        function handleSubmit(e, thread_name, thread_message) {
            e.preventDefault();
            props.createThread(name, message);
            if (thread_name == '' || thread_message == '') {
                return false;
            } else {
                console.log("sent request");
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

        function sortByLikes(e) {
            e.preventDefault();
            fetch(`${BACKEND_PORT}/forum_posts_by_likes/`)
                .then((response) => {
                    response.json().then((data) => {
                        let old_posts = [];
                        for (let i = 0; i < data.length; i++) {
                            console.log(data[i]);
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
                });
        };

        function sortByNew(e) {
            e.preventDefault();
            fetch(`${BACKEND_PORT}/forum_posts_by_new/`)
                .then((response) => {
                    response.json().then((data) => {
                        let old_posts = [];
                        for (let i = 0; i < data.length; i++) {
                            console.log(data[i]);
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
                });
        };

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
        const [time, setTime] = useState('Loading...');
        const [comments, setComments] = useState([]);
        const [showAddCommentField, setVisibility] = useState(false);

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

        const createdOn = props.createdOn;
        let dateTimer = setInterval(tick, 1000);
        function tick() {
            setTime(howOld(createdOn));
        }

        function addComment(name , message) {
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
            <div className="thread" id={props.id}>
                <div className="thread-name">{props.name}</div>
                <button className="reply-button" onClick={()=> setVisibility(true)}>Reply</button>
                <button className="like-button" onClick={addLike}>Like</button>
                <div className="likes">{likes}</div>
                <p>{props.message}</p>
                {comments}
                {showAddCommentField ? <CreateSubCommentForm createComment={addComment}/> : null}
                <p>{time}</p>
            </div>
        );
    }

    //UI for creating-sub-comment form
    function CreateSubCommentForm(props) {
        //state to store message of the comment
        const [message, setMessage] = useState('');

        function handleSubmit(e, thread_name, thread_message) {
            e.preventDefault();
            //need to change this from 'Adam' to User_ID or something similar
            props.createComment('Adam', message);
            setMessage('');
        }

        return (
            <form>
                <input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Comment Message"
                    //className="*Need comment-mesage class*"
                    name="thread_message"
                />
                <button
                    type="submit"
                    //className="*need comment-button class*"
                    onClick={(e) => handleSubmit(e, message)}
                >
                    Comment
                </button>
            </form>
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
    };

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

    // Returns Forum
    return (
        <React.Fragment>
            <ForumManager createThread={addThread}/>
            {threads}
        </React.Fragment>
    );
}



export default Forum;