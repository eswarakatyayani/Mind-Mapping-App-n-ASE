import  { useState } from 'react'

function useInput(input) {
    const [myVariable,setMyVariable] = useState(input) 
    const resetVariable = () =>{
        setMyVariable(input)
    }
    const bindVariable = {
        value: myVariable,
        onChange : e => {setMyVariable(e.target.value)}
    }
    const setVariable = (value) =>{
        setMyVariable(value)
    }
  return [myVariable,setVariable,bindVariable, resetVariable]
}

export default useInput

