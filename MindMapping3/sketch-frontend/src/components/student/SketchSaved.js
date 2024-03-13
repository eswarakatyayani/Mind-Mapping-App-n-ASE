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

function SketchSaved() {
    const history = useHistory();
    const [sketches, setSketches] = useState([])
    const [students, setStudents] = useState([])
    
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    useEffect(() => {
        axios.get(backEnd.backEndSketch, header)
            .then(response => {
                console.log(response.data);
                setSketches(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);
    useEffect(() => {
        axios.get(backEnd.backEndStudents, header)
            .then(response => {
                console.log(response.data);
                setStudents(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);
    const viewSketch =sketchId=>{
        console.log(sketchId)
        history.push("./home?sketchId="+sketchId);   
    }

    const shareSketch = (e) =>{
        e.preventDefault()
        let studentId = e.target[0].value
        let sketchId = e.target[1].value
        axios.get(backEnd.backEndShare+"?studentId="+studentId+"&sketchId="+sketchId, header)
        .then(response => {
            console.log(response.data);
            alert(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <div className='container'>
            <div className='text-center mt-3 h4'>Saved Sketchs</div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Sketch Id</th>
                        <th>Created By</th>
                        <th>Date</th>
                        <th>Share</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {sketches.map((sketch,index)=><tr key={index}>
                        <td>{sketch['sketchId']}</td>
                        <td>{sketch['studentModel'].name} ({sketch['studentModel'].email})</td>
                        <td>{sketch['date']}</td>
                        <td>
                            <form onSubmit={shareSketch}>
                                <div className='row'>
                                    <div className='col-md-8'>
                                        <select className='form-control mt-1' required>
                                            <option value="">CHoose User to Share</option>
                                            {students.map((student,index)=><option key={index} value={student['studentId']}>{student['name']} ({student['email']})</option>)}
                                        </select>
                                    </div>
                                    <input type='hidden' value={sketch['sketchId']}/>
                                    <div className='col-md-2 mt-1'>
                                        <input type='submit' value="share" className='btn btn-primary'/>
                                    </div>
                                </div>
                            </form>
                        </td>
                        <td><button className='btn btn-primary w-100' onClick={()=>viewSketch(sketch['sketchId'])}>View</button></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default SketchSaved