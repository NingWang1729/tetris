import React, { useState, useEffect } from 'react';
import '../styles/about.css';

function About(port_to_backend) {
    const BACKEND_PORT = port_to_backend;
    return (
        <React.Fragment>
            <br/>
            <br/>
            <br/>
            <div class="about-section">
                <h1>About Us Page</h1>
                <p>Our team consists of 4 UCLA undergraduates.</p>
                <p>Go Bruins!</p>
            </div>

            <h2>Our Team</h2>
            <div class="row">
                <div class="card">
                    <div class="container">
                        <h2>Ning Wang</h2>
                        <p class="title">Project Leader</p>
                        <p>Full-stack Developer</p>
                        <p>Primary tetris logic and backend</p>
                        <p><button class="button">Contact</button></p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="card">
                        <div class="container">
                            <h2>Nevin Liang</h2>
                            <p class="title">Project Member</p>
                            <p>Frontend Developer</p>
                            <p>Designed homepage and about page</p>
                            <p><button class="button">Contact</button></p>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="container">
                            <h2>Adam Muzzarelli</h2>
                            <p class="title">Project Member</p>
                            <p>Frontend Developer</p>
                            <p>Designed and helped connect Forum</p>
                            <p><button class="button">Contact</button></p>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="container">
                            <h2>Henry Li</h2>
                            <p class="title">Project Member</p>
                            <p>Bug Tester</p>
                            <p>Helped patch bugs and game logic</p>
                            <p><button class="button">Contact</button></p>
                        </div>
                    </div>
                </div>
            </div>


        </React.Fragment>
    );
};

export default About;
