import React from 'react'
import { FiMenu } from "react-icons/fi";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useRouteMatch
  } from "react-router-dom";

function Head() {
    let match = useRouteMatch();
    return (
        <div className='menu'>
            <div className='menu-icon'><FiMenu></FiMenu> Menu</div>
            <div className='menu-items'>
                <div className='pt-5'></div>
                <div className='menu-item'>
                    <Link to={`${match.url}/home`}  className="nav-item nav-link">New Sketch</Link>
                </div>
                <div className='menu-item'>
                    <Link to={`${match.url}/profile`}  className="nav-item nav-link">Profile</Link>
                </div>
                <div className='menu-item'>
                    <Link to={`${match.url}/sketchSaved`}  className="nav-item nav-link">Saved Sketches</Link>
                </div>
                <div className='menu-item'>
                    <Link to={`${match.url}/sketchShared`}  className="nav-item nav-link">Shared Sketches</Link>
                </div>
                <div className='menu-item'>
                    <Link to={`${match.url}/sketchReceived`}  className="nav-item nav-link">Received Sketches</Link>
                </div>
                <div className='menu-item'>
                    <Link to={`${match.url}/signout`}  className="nav-item nav-link">Logout</Link>
                </div>
            </div>
        </div>
    )
}

export default Head