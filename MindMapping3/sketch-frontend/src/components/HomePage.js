import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import useInput from '../customHook/useInput'
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";

// import img1 from '../asserts/img3.png'
const backEnd = require('../BackEnd')

function HomePage() {
    const [name, setName,  bindName, resetName] = useInput('')
    const [phone, setPhone, bindPhone, resetPhone] = useInput('')
    const [email, setEmail,  bindEmail, resetEmail] = useInput('')
    const [password, setPassword, bindPassword, resetPassword] = useInput('')
    const [age, setAge, bindAge, resetAge] = useInput('')
    const [university, setUniversity,  bindUniversity, resetUniversity] = useInput('')
    const [address, setAddress, bindAddress, resetAddress] = useInput('')
    const history = useHistory();

    const signup = e =>{
        e.preventDefault()
        let student = {
            "name":name,
            "phone":phone,
            "email":email,
            "password":password,
            "age":age,
            "university":university,
            "address":address,
        }
        
        axios.post(backEnd.backEndStudentRegistration, student).then(response => {
            alert(response.data)
            setName('')
            setUniversity('')
            setPhone('')
            setAddress('')
            setAge('')
        }).catch(err => {
            alert('Error While Adding The user')
        })
    }
    const signin = e =>{
        e.preventDefault()
        let student = {
            "email":email,
            "password":password,
        }
        axios.post(backEnd.backEndStudentLogin, student).then(response => {
            console.log(response.data);
            let token =response.data
            if(token==='Invalid Login Details') {
                alert('Invalid Login Details')
            }else{
                console.log(token)
                setEmail('')
                setPassword('')
                Cookies.set('token',token)
                console.log(Cookies.get('token'))
                history.push("/student"); 
            }
        }).catch(err => {
            console.log(err)
            alert('Something Went Wrong')
        })
    }
    
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='card mt-3'>
                        <div className='card-header p-3 h4 text-center'>New Account Create Here</div>
                        <div className='card-body card-body1'>
                            <form onSubmit={signup}>
                                <div className='mt-3'>
                                    <label>Name</label>
                                    <input required placeholder='Your Name' {...bindName} className='form-control'/>
                                </div>
                                <div className='mt-3'>
                                    <label>Email Address</label>
                                    <input type='email' required placeholder='Your Email Address' {...bindEmail} className='form-control'/>
                                </div>
                                <div className='mt-3'>
                                    <label>Phone Number</label>
                                    <input type='number' required placeholder='Your Phone Number' {...bindPhone} className='form-control'/>
                                </div>
                                <div className='mt-3'>
                                    <label>Password</label>
                                    <input type='password' required placeholder='Set New Password' {...bindPassword} className='form-control'/>
                                </div>
                                <div className='mt-3'>
                                    <label>Age</label>
                                    <input type='number' min='10' max='100' {...bindAge} required placeholder='How Old are you ?' className='form-control'/>
                                </div>
                                <div className='mt-3'>
                                    <label>University</label>
                                    <input required placeholder='Your University Name' {...bindUniversity} className='form-control'/>
                                </div>
                                <div className='mt-3'>
                                    <label>Address</label>
                                    <textarea required placeholder='Provide Your Address' {...bindAddress} className='form-control'></textarea>
                                </div>
                                <div className='mt-3'>
                                    <input type='submit' value="Create New Account" className='btn btn-primary w-100'/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='col-md-6'>
                <div className='card mt-3'>
                    <div className='card-header p-3 h4 text-center'>Login Here</div>
                    <div className='card-body card-body2'>
                        <form onSubmit={signin}>
                            <div className='mt-3'>
                                <label>Email Address</label>
                                <input required placeholder='Your Email Address' {...bindEmail} className='form-control'/>
                            </div>
                            <div className='mt-3'>
                                <label>Password</label>
                                <input type='password' required placeholder='Enter Your Password' {...bindPassword} className='form-control'/>
                            </div>
                            <div className='mt-3'>
                                <input type='submit' value="Login to Your Account" className='btn btn-primary w-100'/>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage