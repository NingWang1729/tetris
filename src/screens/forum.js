import React, { useState, useEffect } from 'react';
import '../styles/forum.css';

function forum() {
    /*TODO:
        make button that allows creation of new comment threads
    */
    return (
        <React.Fragment>
            <Comment user="John Doe" message="Test 1"/>
            <Comment user="Adam Muzzarelli" message="Mr. Yang I love your Tetris game, you are the GOAT"/>
        </React.Fragment>
    );
}

function Comment(props) {
    /*TODO: 
        need to allow possibility to add subcomments
        need to make it so user can only like or unlike, not keep adding likes
    */
    var [likes, setLikes] = useState(0);
    //var [subComments, setSubComments] = useState([]);

    //note: I used a div instead of a react.fragment cause i wanted to stylize the wrapper for each comment
    return (
        <div className="comment">
            <div className="user-name">{props.user}</div>
            <button className="reply-button">Reply</button>
            <button className="like-button" onClick={()=> setLikes(likes+1)}>Like</button>
            <div className="likes">{likes}</div>
            <p>{props.message}</p>
        </div>
    );
}

export default forum;