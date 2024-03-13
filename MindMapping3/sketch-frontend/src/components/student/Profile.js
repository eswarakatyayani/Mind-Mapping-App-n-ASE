import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useRouteMatch
  } from "react-router-dom";
const backEnd = require('../../BackEnd')
function Profile() {
    const [student, setStudent] = useState([])
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    useEffect(() => {
        axios.get(backEnd.backEndStudent, header)
            .then(response => {
                console.log(response.data);
                setStudent(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);
    return (
        <div className='row'>
            <div className='col-md-4'></div>
            <div className='col-md-4 mt-5'>
                <div className='card p-3'>
                    <div className='text-center h4'>Your Profile</div>
                    <div className='mt-3'>
                        <div className='text-muted' style={{fontSize:'12px'}}>Name</div>
                        <div>{student['name']}</div>
                    </div>
                    <div className='mt-3'>
                        <div className='text-muted' style={{fontSize:'12px'}}>Email</div>
                        <div>{student['email']}</div>
                    </div>
                    <div className='mt-3'>
                        <div className='text-muted' style={{fontSize:'12px'}}>Phone</div>
                        <div>{student['phone']}</div>
                    </div>
                    <div className='mt-3'>
                        <div className='text-muted' style={{fontSize:'12px'}}>Age</div>
                        <div>{student['age']}</div>
                    </div>
                    <div className='mt-3'>
                        <div className='text-muted' style={{fontSize:'12px'}}>University</div>
                        <div>{student['university']}</div>
                    </div>
                    <div className='mt-3'>
                        <div className='text-muted' style={{fontSize:'12px'}}>Address</div>
                        <div>{student['address']}</div>
                    </div>
                </div>
            </div>
            <div className='col-md-4'></div>
        </div>
    )
}

export default Profile