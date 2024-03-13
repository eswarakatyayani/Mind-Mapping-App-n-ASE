import { FiMinus,FiRotateCcw,FiRotateCw,FiMaximize2,FiMinimize2,FiRefreshCcw,FiRefreshCw,FiSave } from "react-icons/fi";
import { FiType, FiCircle, FiSquare } from "react-icons/fi";
import React, { useEffect, useRef, useState } from 'react'
import ReactDOMServer from "react-dom/server";
import { act } from "react-dom/test-utils";
function Sketch() {
    let sketch_panel = undefined
    const [elements, setElements] = useState([])
    const [actions, setActions] = useState([])
    const [currentElement, setCurrentElement] = useState(undefined)
    const [newElement, setNewElement] = useState(undefined)

    useEffect(() => {
        if(newElement!=undefined){
            sketch_panel = document.getElementById('sketch_panel')
            sketch_panel.addEventListener("mousedown", mousedownNewIcon)
        }
    }, [newElement]);

    useEffect(() => {
        console.log('action added')
        
    }, [actions]);

    const setNewIcon = (newIconName, iconId) =>{
        if(iconId==undefined){
            iconId = newIconName+elements.length
        }
        setNewElement({"newIconName":newIconName, "iconId":iconId})
    }
    const mousedownNewIcon = (e) =>{
        setElementOnUi(e.clientX, e.clientY,newElement['newIconName'],newElement['iconId'])
    }
    const setElementOnUi = (mouseX, mouseY,newIconName, iconId) =>{
        mouseX = mouseX-40
        mouseY = mouseY-40
        if(newIconName==='FiType') {
            mouseX = mouseX-20
            mouseY = mouseY-20
        }
        getElement(mouseX, mouseY, newIconName, iconId)
        let elements2 = elements
        elements2.push(iconId)
        setElements(elements2)
        writeAction(iconId,'defination')
        writeAction(iconId,'manipulation')
    }
    
    const getElement = (mouseX, mouseY, newIconName, iconId) => {
        let element = ReactDOMServer.renderToString(<div>
            <div>{newIconName==='FiType'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><input id={iconId+'icon'} style={{fontSize:'14px',borderTop:'none',borderLeft:'none', borderRight:'none',textAlign:'center'}}  className='icon'/><input type='hidden' className="text-center"  value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiCircle'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiCircle  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiCircle><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiSquare'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiSquare  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiSquare><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
        </div>
        );
        document.getElementById('sketch_panel_item').insertAdjacentHTML("afterend",element);
        sketch_panel.removeEventListener("mousedown", mousedownNewIcon)
        document.getElementById("currentElementId").innerHTML = iconId
        setMouseEvent(iconId)
    }

    const writeAction = (iconId, actionType) =>{
        let element = document.getElementById(iconId)
        let elementIcon = document.getElementById(iconId+'icon')
        let elementName = document.getElementById(iconId+'iconName').value
        let font_size = window.getComputedStyle(elementIcon, null).getPropertyValue('font-size')
        let text = ""
        if(elementName==='FiType'){
            text = elementName.value
        }
        let stroke = elementIcon.getAttribute("stroke")
        let strokeWidth = elementIcon.getAttribute("stroke-width")
        let top = element.offsetTop
        let leftt = element.offsetLeft
        let action = {"action":actionType, "iconId":iconId,"elementName":elementName, "fontSize":font_size, "transform":element.style.transform, "text":text, "stroke":stroke,"strokeWidth":strokeWidth, "top":top, "leftt": leftt}
        let actions2 = actions
        actions2.push(action)
        console.log(action)
        setActions(actions2)
        document.getElementById("currentIndex").innerHTML = actions2.length-1
    }

    const setMouseEvent = (iconId) => {
        let element = document.getElementById(iconId)
        const mousedown = (e) =>{
            document.getElementById("currentElementId").innerHTML = iconId
            element.addEventListener("mousemove", mousemove)
            element.addEventListener("mouseup", mouseup)
        }
        element.addEventListener("mousedown", mousedown)

        const mousemove = (e) =>{
            element.style.left = e.clientX-element.offsetWidth/2+"px"
            element.style.top = e.clientY-element.offsetHeight/2+"px"
        }
        const mouseup = (e) =>{
            element.removeEventListener("mousemove",mousemove)
            writeAction(iconId,'manipulation')
        }
    }
    const rotate = (rotation_direction) =>{
        let iconId = document.getElementById("currentElementId").innerHTML
        let element = document.getElementById(iconId)
        console.log(element)
        let current_transform = element.style.transform
        if(current_transform===""){
            current_transform = 0
        }else{
            let rotate = element.style.transform.match(/rotate\((\d+)(.+)\)/);
            let num2 = "2"
                console.log(rotate)
                if (rotate) {
                    current_transform = parseInt(rotate[1]) 
                }else{
                    rotate = element.style.transform.match(/rotate\((-?\d+)(.+)\)/);
                    if(rotate){
                        current_transform = parseInt(rotate[1]) 
                    }
                    console.log(rotate)
                }

        }
        console.log(current_transform)
        if(rotation_direction=='clock') {
            current_transform = current_transform + 10
            element.style.transform = `rotate(${current_transform}deg)`
        }else{
            current_transform = current_transform - 10
            element.style.transform = `rotate(${current_transform}deg)`
        }
        writeAction(iconId,'manipulation')
    }
    const setSize = (operation) =>{
        let iconId = document.getElementById("currentElementId").innerHTML
        let element = document.getElementById(iconId+"icon")
        let current_font_size = window.getComputedStyle(element, null).getPropertyValue('font-size')
        current_font_size = current_font_size.replace("px","")
        current_font_size = parseInt(current_font_size)
        if(operation==='increase') {
            current_font_size = current_font_size+2
        }else{
            current_font_size = current_font_size-2
        }
        element.style.fontSize = current_font_size+'px'
        console.log(current_font_size)
        writeAction(iconId,'manipulation')
    }

    const setStroke = (size) =>{
        console.log(size)
        let iconId = document.getElementById("currentElementId").innerHTML
        let element = document.getElementById(iconId+"icon")
        element.setAttribute("stroke-width", ""+size)
        writeAction(iconId,'manipulation')
    }
    const changeColor = (e) =>{
        let color = e.target.value
        let iconId = document.getElementById("currentElementId").innerHTML
        let element = document.getElementById(iconId+"icon")
        element.setAttribute("stroke", color)
        writeAction(iconId,'manipulation')
    }

    const undo = () =>{
        let currentIndex = document.getElementById("currentIndex").innerHTML
        if(parseInt(currentIndex)==0){
            alert("No Actions Available to undo")
            return
        }
        let index = parseInt(currentIndex)-1
        console.log(index)
        setUserInterface(index,'undo')
        document.getElementById("currentIndex").innerHTML = index
    }

    const redo = () =>{
        let currentIndex = document.getElementById("currentIndex").innerHTML
        console.log(currentIndex)
        let index = parseInt(currentIndex) 
        setUserInterface(index,'redo')
        if(index==actions.length-1){
            alert("No Actions Available to redo")
            return
        }else{
            document.getElementById("currentIndex").innerHTML = index + 1
        }
    }
    const setUserInterface =(index,actionType) =>{
        console.log(actions)
        let action = actions[index]
        console.log(action)
        if(action['action']==='defination') {
            if(actionType==='undo') {
                let element = document.getElementById(action['iconId'])
                element.remove()
                console.log('removed')
            }else{
                getElement()
            }
        }else{
            let element = document.getElementById(action['iconId'])
            element.style.top = action['top']+"px"
            element.style.left = action['leftt']+"px"
        }
        document.getElementById("currentIndex").innerHTML = index
    }
    const saveSketch = () => {

    }
    return (
        <div className=''>
            
            <div className='icons-panel'>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-4 text-white mt-3" id="icon-panel">
                        <div className="row">
                            <div className="col-md-1 mt-1 text-center" title="FiType" onClick={()=>setNewIcon('FiType')}><FiType className="icon-item"></FiType></div>
                            <div className="col-md-1 mt-1 text-center" title="FiCircle" onClick={()=>setNewIcon('FiCircle')}><FiCircle className="icon-item"></FiCircle></div>
                            <div className="col-md-1 mt-1 text-center" title="FiSquare" onClick={()=>setNewIcon('FiSquare')}><FiSquare className="icon-item"></FiSquare></div>
                        </div>
                    </div>
                    <div className="col-md-1">
                        <div className="text-white mt-2 text-center">Stroke</div>
                        <div className="line1 mt-2" onClick={()=>setStroke(1)}></div>
                        <div className="line2 mt-3" onClick={()=>setStroke(2)}></div>
                        <div className="line3 mt-3" onClick={()=>setStroke(3)}></div>
                        <div className="line4 mt-3" onClick={()=>setStroke(4)}></div>
                        <div className="line5 mt-3" onClick={()=>setStroke(5)}></div>
                    </div>
                    <div className="col-md-1">
                        <div className="text-white mt-2 text-center">Rotate</div>
                        <div className="text-white text-center" onClick={()=>rotate('anticlock')} style={{fontSize:'35px'}}><FiRefreshCcw className="action_icon"></FiRefreshCcw></div>
                        <div className="text-white text-center" onClick={()=>rotate('clock')} style={{fontSize:'35px'}}><FiRefreshCw className="action_icon"></FiRefreshCw></div>
                    </div>
                    <div className="col-md-1">
                        <div className="text-white mt-2 text-center">Size</div>
                        <div className="text-white text-center" onClick={()=>setSize('increase')} style={{fontSize:'35px'}}><FiMaximize2 className="action_icon"></FiMaximize2></div>
                        <div className="text-white text-center" onClick={()=>setSize('descrease')} style={{fontSize:'35px'}}><FiMinimize2 className="action_icon"></FiMinimize2></div>
                    </div>
                    <div className="col-md-1">
                        <div className="text-white mt-2 text-center">Undo, Redo</div>
                        <div className="text-white text-center" onClick={undo} style={{fontSize:'35px'}}><FiRotateCcw className="action_icon"></FiRotateCcw></div>
                        <div className="text-white text-center" onClick={redo} style={{fontSize:'35px'}}><FiRotateCw className="action_icon"></FiRotateCw></div>
                    </div>
                    <div className="col-md-1">
                        <div className="text-white mt-2 text-center">Color</div>
                        <div className="text-white mt-3 text-center" onClick={saveSketch} style={{fontSize:'35px'}}><input type="color" id="color" onInput={changeColor} /></div>
                    </div>
                    <div className="col-md-1">
                        <div className="text-white mt-2 text-center">Save</div>
                        <div className="text-white text-center" style={{fontSize:'55px'}}><FiSave className="action_icon"></FiSave></div>
                    </div>
                </div>
            </div>
        <div id="sketch_panel">
            <div id="sketch_panel_item"></div>
        </div>
        <div id="currentElementId" style={{display:'none'}}></div>
        <div id="currentIndex" style={{display:'display'}}>0</div>
        </div>
    )
}

export default Sketch