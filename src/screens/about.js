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
                <p>Our team consists of 3 Mega Brains and 1 Scrub.</p>
                <p>Scrub ftw!!!</p>
            </div>

            <h2>Our Team</h2>
            <div class="row">
                <div class="card">
                    <div class="container">
                        <h2>Ning Wang</h2>
                        <p class="title">Project Leader</p>
                        <p>Mega Brain dude</p>
                        <p>ninggobrrr@gmail.com</p>
                        <p><button class="button">Contact</button></p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="column">
                    <div class="card">
                        <div class="container">
                            <h2>Nevin Liang</h2>
                            <p class="title">Slave #1</p>
                            <p>Milli Brain dude</p>
                            <p>nevingobrrr@gmail.com</p>
                            <p><button class="button">Contact</button></p>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="container">
                            <h2>Adam Muzzarelli</h2>
                            <p class="title">Slave #2</p>
                            <p>Another Mega Brain dude</p>
                            <p>adamgobrrr@gmail.com</p>
                            <p><button class="button">Contact</button></p>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="container">
                            <h2>Henry Li</h2>
                            <p class="title">Slave #3</p>
                            <p>A Mega Brain dude</p>
                            <p>henrygobrrr@gmail.com</p>
                            <p><button class="button">Contact</button></p>
                        </div>
                    </div>
                </div>
            </div>


        </React.Fragment>
    );
};

export default About;
