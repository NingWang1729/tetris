import React, { useState, useEffect } from 'react';

function Home(port_to_backend) {
    const BACKEND_PORT = port_to_backend;
    return (
        <React.Fragment>
            <h1>
                <p>Hello World!</p>
                <p>Please use /tetris for tetris and /forum for forum in url</p>
                <p>Current backend port is: {BACKEND_PORT}</p>
            </h1>
        </React.Fragment>
    );
};

export default Home;