import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useRouteMatch
  } from "react-router-dom";
const backEnd = require('../../BackEnd')

function SketchReceived() {
    const history = useHistory();
    const [sketcheShareds, setSketcheShareds]= useState([])
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    useEffect(() => {
        axios.get(backEnd.backEndReceived, header)
            .then(response => {
                console.log(response.data);
                setSketcheShareds(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);
    const viewSketch =sketchId=>{
        console.log(sketchId)
        history.push("./home?sketchId="+sketchId);   
    }
    return (
        <div className='container'>
            <div className='text-center mt-3 h4'>Sketches Shared By Your</div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Sketch Id</th>
                        <th>Sender</th>
                        <th>Shared Date</th>
                        <th>Receiver</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {sketcheShareds.map((sketcheShared,index)=><tr key={index}>
                        <td>{sketcheShared['sketchSharedId']}</td>
                        <td>{sketcheShared['studentModelSender'].name} ({sketcheShared['studentModelSender'].email})</td>
                        <td>{sketcheShared['sharedDate']}</td>
                        <td>{sketcheShared['studentModelReceiver'].name} ({sketcheShared['studentModelReceiver'].email})</td>
                        <td><button className='btn btn-primary w-100' onClick={()=>viewSketch(sketcheShared['sketchModel']['sketchId'])}>View</button></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default SketchReceived