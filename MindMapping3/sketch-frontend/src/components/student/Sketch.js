import { FiRotateCcw,FiRotateCw,FiRefreshCcw,FiRefreshCw,FiSave } from "react-icons/fi";
import { FiType, FiCircle, FiSquare, FiArrowRight, FiBox, FiChevronsRight,FiCornerLeftDown, FiChevronRight,FiHeart, FiHexagon, FiMessageSquare,FiNavigation2 } from "react-icons/fi";
import { FiMinus, FiPlus, FiUsers, FiUser, FiTrendingUp, FiTag, FiSmartphone, FiSkipForward, FiSidebar, FiSettings, FiSend, FiSearch} from "react-icons/fi";
import { FiRewind, FiMove, FiMaximize2, FiMinimize2, FiMaximize, FiMail, FiFlag, FiUserMinus, FiDroplet, FiCoffee, FiCloudDrizzle, FiArrowLeftCircle, FiUserPlus} from "react-icons/fi";

import React, { useEffect, useRef, useState } from 'react'
import ReactDOMServer from "react-dom/server";
import qs from 'qs'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'
const backEnd = require('../../BackEnd')


function Sketch(props) {
    let sketchId=qs.parse(props.location.search, { ignoreQueryPrefix: true })['sketchId']
    const history = useHistory();
    let sketch_panel = undefined
    console.log(Cookies.get('token'))
    const [elements, setElements] = useState([])
    const [actions, setActions] = useState([])
    const [actions2, setActions2] = useState([])
    const [currentElement, setCurrentElement] = useState(undefined)
    const [newElement, setNewElement] = useState(undefined)
    const header = {
        headers: {
            "Content-type": "Application/json",
            "Authorization": `Bearer ${Cookies.get('token')}`
        }
    }
    useEffect(() => {
        if(newElement!=undefined){
            sketch_panel = document.getElementById('sketch_panel')
            sketch_panel.addEventListener("mousedown", mousedownNewIcon)
        }
    }, [newElement]);

    useEffect(() => {
        if(sketchId!=undefined){
            axios.get(backEnd.backEndSketch+"/"+sketchId, header)
            .then(response => {
                console.log(response.data);
                let actions =response.data 
                setActions2(response.data)
                let elements2 = []
                for(let i=0;i<actions.length;i++){
                    let action = actions[i]
                    getElement2(action['leftt'],action['top'],action['elementName'],action['iconId'])
                    elements2.push(action['iconId'])
                    let element = document.getElementById(action['iconId'])
                    element.style.top = action['top']+"px"
                    element.style.left = action['leftt']+"px"
                    element.style.transform = action['transform']
                    let elementIcon = document.getElementById(action['iconId']+"icon")
                    elementIcon.setAttribute("stroke-width", ""+action['strokeWidth'])
                    elementIcon.style.fontSize = action['fontSize']
                    elementIcon.setAttribute("stroke", ""+action['stroke'])
                    elementIcon.setAttribute("fill", ""+action['fill'])
                    if(action['elementName']==='FiType'){
                        elementIcon.value = action['text']
                    }
                }
                setElements(elements2)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, []);

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
            <div>{newIconName==='FiArrowRight'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiArrowRight  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiArrowRight><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiBox'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiBox  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiBox><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiChevronsRight'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiChevronsRight  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiChevronsRight><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiCornerLeftDown'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiCornerLeftDown  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiCornerLeftDown><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiChevronRight'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiChevronRight  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiChevronRight><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiHeart'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiHeart  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiHeart><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiHexagon'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiHexagon  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiHexagon><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiMessageSquare'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiMessageSquare  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiMessageSquare><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiNavigation2'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiNavigation2  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiNavigation2><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiMinus'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiMinus  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiMinus><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiMinus'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiMinus  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiMinus><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiPlus'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiPlus  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiPlus><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiUsers'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiUsers  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiUsers><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiUserMinus'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiUserMinus  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiUserMinus><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiTrendingUp'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiTrendingUp  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiTrendingUp><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiTag'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiTag  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiTag><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiSmartphone'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiSmartphone  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiSmartphone><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiSkipForward'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiSkipForward  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiSkipForward><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiSidebar'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiSidebar  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiSidebar><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiSettings'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiSettings  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiSettings><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiSend'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiSend  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiSend><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiSearch'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiSearch  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiSearch><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiRewind'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiRewind  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiRewind><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiMove'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiMove  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiMove><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiMaximize2'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiMaximize2  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiMaximize2><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiMinimize2'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiMinimize2  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiMinimize2><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiMaximize'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiMaximize  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiMaximize><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiMail'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiMail  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiMail><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiFlag'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiFlag  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiFlag><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiUserPlus'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiUserPlus  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiUserPlus><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiDroplet'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiDroplet  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiDroplet><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiCoffee'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiCoffee  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiCoffee><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiCloudDrizzle'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiCloudDrizzle  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiCloudDrizzle><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiArrowLeftCircle'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiArrowLeftCircle  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiArrowLeftCircle><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
        </div>
        );
        document.getElementById('sketch_panel_item').insertAdjacentHTML("afterend",element);
        sketch_panel.removeEventListener("mousedown", mousedownNewIcon)
        document.getElementById("currentElementId").innerHTML = iconId
        setMouseEvent(iconId)
    }

    const getElement2 = (mouseX, mouseY, newIconName, iconId) => {
        let element = ReactDOMServer.renderToString(<div>
            <div>{newIconName==='FiType'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><input id={iconId+'icon'} style={{fontSize:'14px',borderTop:'none',borderLeft:'none', borderRight:'none',textAlign:'center'}}  className='icon'/><input type='hidden' className="text-center"  value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiCircle'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiCircle  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiCircle><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiSquare'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiSquare  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiSquare><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiArrowRight'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiArrowRight  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiArrowRight><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiBox'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiBox  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiBox><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiChevronsRight'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiChevronsRight  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiChevronsRight><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiCornerLeftDown'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiCornerLeftDown  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiCornerLeftDown><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiChevronRight'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiChevronRight  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiChevronRight><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiHeart'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiHeart  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiHeart><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiHexagon'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiHexagon  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiHexagon><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiMessageSquare'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiMessageSquare  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiMessageSquare><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiNavigation2'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiNavigation2  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiNavigation2><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiMinus'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiMinus  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiMinus><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiMinus'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiMinus  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiMinus><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiPlus'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiPlus  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiPlus><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiUsers'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiUsers  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiUsers><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiUserMinus'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiUserMinus  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiUserMinus><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiTrendingUp'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiTrendingUp  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiTrendingUp><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiTag'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiTag  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiTag><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiSmartphone'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiSmartphone  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiSmartphone><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiSkipForward'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiSkipForward  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiSkipForward><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiSidebar'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiSidebar  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiSidebar><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiSettings'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiSettings  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiSettings><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiSend'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiSend  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiSend><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiSearch'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiSearch  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiSearch><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiRewind'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiRewind  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiRewind><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiMove'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiMove  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiMove><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiMaximize2'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiMaximize2  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiMaximize2><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiMinimize2'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiMinimize2  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiMinimize2><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiMaximize'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiMaximize  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiMaximize><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiMail'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiMail  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiMail><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiFlag'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiFlag  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiFlag><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiUserPlus'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiUserPlus  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiUserPlus><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiDroplet'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiDroplet  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiDroplet><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiCoffee'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiCoffee  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiCoffee><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiCloudDrizzle'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiCloudDrizzle  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiCloudDrizzle><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
            <div>{newIconName==='FiArrowLeftCircle'?<div id={iconId} style={{position:'absolute',top:mouseY+"px", left:mouseX+"px", cursor:'pointer'}}><FiArrowLeftCircle  id={iconId+'icon'} style={{fontSize:'80px'}}  className='icon'></FiArrowLeftCircle><input type='hidden' value={newIconName} id={iconId+'iconName'}/> </div>:null}</div>
        </div>
        );
        document.getElementById('sketch_panel_item').insertAdjacentHTML("afterend",element);
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
            text = elementIcon.value
        }
        let stroke = elementIcon.getAttribute("stroke")
        let strokeWidth = elementIcon.getAttribute("stroke-width")
        let top = element.offsetTop
        let leftt = element.offsetLeft
        let fill = elementIcon.getAttribute("fill")
        let action = {"action":actionType, "iconId":iconId,"elementName":elementName, "fontSize":font_size, "transform":element.style.transform, "text":text, "stroke":stroke,"strokeWidth":strokeWidth, "top":top, "leftt": leftt, "fill": fill}
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
    const setFill = (e) =>{
        let color = e.target.value
        let iconId = document.getElementById("currentElementId").innerHTML
        let element = document.getElementById(iconId+"icon")
        element.setAttribute("fill", color)
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
        let index = parseInt(currentIndex)
        if(index==0){
            alert("No Actions Available to undo")
            console.log(index)
            // setUserInterface(index,'undo')
        }else{
            index = index-1
            setUserInterface(index,'undo')
        }
    }

    const redo = () =>{
        let currentIndex = document.getElementById("currentIndex").innerHTML
        let index = parseInt(currentIndex) 
        if(index==0){
            setUserInterface(index,'redo')
        }else{
            if(index==actions.length-1){
                alert("No Actions Available to redo")
            }else{
                index = index+1
                setUserInterface(index,'redo')
            }
            
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
            }else {
                getElement(action['leftt'],action['top'],action['elementName'],action['iconId'])
                index = index+1
            }
        }else{
            let element = document.getElementById(action['iconId'])
            element.style.top = action['top']+"px"
            element.style.left = action['leftt']+"px"
            element.style.transform = action['transform']
            let elementIcon = document.getElementById(action['iconId']+"icon")
            elementIcon.setAttribute("stroke-width", ""+action['strokeWidth'])
            elementIcon.style.fontSize = action['fontSize']
            elementIcon.setAttribute("stroke", ""+action['stroke'])
            elementIcon.setAttribute("fill", ""+action['fill'])
            if(action['elementName']==='FiType'){
                elementIcon.value = action['text']
            }
        }
        document.getElementById("currentIndex").innerHTML = index
        console.log(actions)
    }
    const saveSketch = () => {
        if(elements.length>0){
            let sketchActions = []
            for(let i=0; i<elements.length;i++){
                let iconId = elements[i]
                let element = document.getElementById(iconId)
                let elementIcon = document.getElementById(iconId+'icon')
                let elementName = document.getElementById(iconId+'iconName').value
                let font_size = window.getComputedStyle(elementIcon, null).getPropertyValue('font-size')
                let text = ""
                if(elementName==='FiType'){
                    text = elementIcon.value
                }
                let stroke = elementIcon.getAttribute("stroke")
                let strokeWidth = elementIcon.getAttribute("stroke-width")
                let top = element.offsetTop
                let leftt = element.offsetLeft
                let fill = elementIcon.getAttribute("fill")
                let action = {"action":'defination', "iconId":iconId,"elementName":elementName, "fontSize":font_size, "transform":element.style.transform, "text":text, "stroke":stroke,"strokeWidth":strokeWidth, "top":top, "leftt": leftt, "fill": fill}
                sketchActions.push(action)
            }
            console.log(sketchActions)
            axios.post(backEnd.backEndSketch+"?sketchId="+sketchId,sketchActions,header).then(response => {
                alert(response.data);   
                history.push("./sketchSaved");   
            }).catch(err => {
                alert('Someting went wrong')
            })
        }else{
            alert("No Actions Performed")
        }
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
                            <div className="col-md-1 mt-1 text-center" title="FiArrowRight" onClick={()=>setNewIcon('FiArrowRight')}><FiArrowRight className="icon-item"></FiArrowRight></div>
                            <div className="col-md-1 mt-1 text-center" title="FiBox" onClick={()=>setNewIcon('FiBox')}><FiBox className="icon-item"></FiBox></div>
                            <div className="col-md-1 mt-1 text-center" title="FiChevronsRight" onClick={()=>setNewIcon('FiChevronsRight')}><FiChevronsRight className="icon-item"></FiChevronsRight></div>
                            <div className="col-md-1 mt-1 text-center" title="FiCornerLeftDown" onClick={()=>setNewIcon('FiCornerLeftDown')}><FiCornerLeftDown className="icon-item"></FiCornerLeftDown></div>
                            <div className="col-md-1 mt-1 text-center" title="FiChevronRight" onClick={()=>setNewIcon('FiChevronRight')}><FiChevronRight className="icon-item"></FiChevronRight></div>
                            <div className="col-md-1 mt-1 text-center" title="FiHeart" onClick={()=>setNewIcon('FiHeart')}><FiHeart className="icon-item"></FiHeart></div>
                            <div className="col-md-1 mt-1 text-center" title="FiHexagon" onClick={()=>setNewIcon('FiHexagon')}><FiHexagon className="icon-item"></FiHexagon></div>
                            <div className="col-md-1 mt-1 text-center" title="FiMessageSquare" onClick={()=>setNewIcon('FiMessageSquare')}><FiMessageSquare className="icon-item"></FiMessageSquare></div>
                            <div className="col-md-1 mt-1 text-center" title="FiNavigation2" onClick={()=>setNewIcon('FiNavigation2')}><FiNavigation2 className="icon-item"></FiNavigation2></div>
                            <div className="col-md-1 mt-1 text-center" title="FiMinus" onClick={()=>setNewIcon('FiMinus')}><FiMinus className="icon-item"></FiMinus></div>
                            <div className="col-md-1 mt-1 text-center" title="FiPlus" onClick={()=>setNewIcon('FiPlus')}><FiPlus className="icon-item"></FiPlus></div>
                            <div className="col-md-1 mt-1 text-center" title="FiUsers" onClick={()=>setNewIcon('FiUsers')}><FiUsers className="icon-item"></FiUsers></div>
                            <div className="col-md-1 mt-1 text-center" title="FiUserMinus" onClick={()=>setNewIcon('FiUserMinus')}><FiUserMinus className="icon-item"></FiUserMinus></div>
                            <div className="col-md-1 mt-1 text-center" title="FiUserPlus" onClick={()=>setNewIcon('FiUserPlus')}><FiUserPlus className="icon-item"></FiUserPlus></div>
                            <div className="col-md-1 mt-1 text-center" title="FiTrendingUp" onClick={()=>setNewIcon('FiTrendingUp')}><FiTrendingUp className="icon-item"></FiTrendingUp></div>
                            <div className="col-md-1 mt-1 text-center" title="FiTag" onClick={()=>setNewIcon('FiTag')}><FiTag className="icon-item"></FiTag></div>
                            <div className="col-md-1 mt-1 text-center" title="FiSmartphone" onClick={()=>setNewIcon('FiSmartphone')}><FiSmartphone className="icon-item"></FiSmartphone></div>
                            <div className="col-md-1 mt-1 text-center" title="FiSkipForward" onClick={()=>setNewIcon('FiSkipForward')}><FiSkipForward className="icon-item"></FiSkipForward></div>
                            <div className="col-md-1 mt-1 text-center" title="FiSidebar" onClick={()=>setNewIcon('FiSidebar')}><FiSidebar className="icon-item"></FiSidebar></div>
                            <div className="col-md-1 mt-1 text-center" title="FiSettings" onClick={()=>setNewIcon('FiSettings')}><FiSettings className="icon-item"></FiSettings></div>
                            <div className="col-md-1 mt-1 text-center" title="FiSend" onClick={()=>setNewIcon('FiSend')}><FiSend className="icon-item"></FiSend></div>
                            <div className="col-md-1 mt-1 text-center" title="FiSearch" onClick={()=>setNewIcon('FiSearch')}><FiSearch className="icon-item"></FiSearch></div>
                            <div className="col-md-1 mt-1 text-center" title="FiRewind" onClick={()=>setNewIcon('FiRewind')}><FiRewind className="icon-item"></FiRewind></div>
                            <div className="col-md-1 mt-1 text-center" title="FiMove" onClick={()=>setNewIcon('FiMove')}><FiMove className="icon-item"></FiMove></div>
                            <div className="col-md-1 mt-1 text-center" title="FiMaximize2" onClick={()=>setNewIcon('FiMaximize2')}><FiMaximize2 className="icon-item"></FiMaximize2></div>
                            <div className="col-md-1 mt-1 text-center" title="FiMinimize2" onClick={()=>setNewIcon('FiMinimize2')}><FiMinimize2 className="icon-item"></FiMinimize2></div>
                            <div className="col-md-1 mt-1 text-center" title="FiMaximize" onClick={()=>setNewIcon('FiMaximize')}><FiMaximize className="icon-item"></FiMaximize></div>
                            <div className="col-md-1 mt-1 text-center" title="FiMail" onClick={()=>setNewIcon('FiMail')}><FiMail className="icon-item"></FiMail></div>
                            <div className="col-md-1 mt-1 text-center" title="FiFlag" onClick={()=>setNewIcon('FiFlag')}><FiFlag className="icon-item"></FiFlag></div>
                            <div className="col-md-1 mt-1 text-center" title="FiDroplet" onClick={()=>setNewIcon('FiDroplet')}><FiDroplet className="icon-item"></FiDroplet></div>
                            <div className="col-md-1 mt-1 text-center" title="FiCoffee" onClick={()=>setNewIcon('FiCoffee')}><FiCoffee className="icon-item"></FiCoffee></div>
                            <div className="col-md-1 mt-1 text-center" title="FiCloudDrizzle" onClick={()=>setNewIcon('FiCloudDrizzle')}><FiCloudDrizzle className="icon-item"></FiCloudDrizzle></div>
                            <div className="col-md-1 mt-1 text-center" title="FiArrowLeftCircle" onClick={()=>setNewIcon('FiArrowLeftCircle')}><FiArrowLeftCircle className="icon-item"></FiArrowLeftCircle></div>

                           
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
                        <div className="text-white mt-2 text-center">Border, Fill</div>
                        <div className="text-white mt-1 text-center"  style={{fontSize:'35px'}}><input type="color" id="color" onInput={changeColor} /></div>
                        <div className="text-white mt-1 text-center"  style={{fontSize:'35px'}}><input type="color" id="color" onInput={setFill} /></div>
                    </div>
                    <div className="col-md-1">
                        <div className="text-white mt-2 text-center">Save</div>
                        <div className="text-white text-center" onClick={saveSketch} style={{fontSize:'55px'}}><FiSave className="action_icon"></FiSave></div>
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