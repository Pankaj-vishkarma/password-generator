import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
function App(){

    const [length,setLength]=useState(8)
    const [number,setNumber]=useState(false)
    const [character,setCharacter]=useState(false)
    const [password,setPassword]=useState("")

    const passwordRef=useRef(null)
    
    

    const passwordGenerator=useCallback(()=>{
       let pass=""
       let str="ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz"
       if(number) str=str+"0123456789"
       if(character) str=str+'~`!@#$%^&*()_+-={}[]|?/'

       for(let i=0;i<length;i++){
         let char=Math.floor(Math.random()*str.length+1)
         pass+=str.charAt(char)
       }
      
       setPassword(pass)

    },[length,number,character,setPassword])

    const copyPassword=useCallback(()=>{
        window.navigator.clipboard.writeText(password)
        passwordRef.current?.setSelectionRange(0,99)
        passwordRef.current?.select()
    },[password])

    useEffect(()=>{
       passwordGenerator()
    },[length,number,character,passwordGenerator])

    return(
        <div className="main"> 

        <div className="input-box">

        <div className="input">
            <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            />
        </div>

        <div className="button">
        <button
        onClick={copyPassword}
        >copy
        </button>
        </div>
        </div>
        
        <div className="check-box">

         <div className="range">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            onChange={(e)=>setLength(e.target.value)}
          />
          <label >length :({length}) </label>
         </div>

         <div className="check-box">
           <input
           type="checkbox"
           value={number}
           onChange={()=>setNumber((prev)=>!prev)}
           />
           <label>Number</label>
         </div>

         <div className="check-box">
          <input
          type="checkbox"
          onChange={()=>setCharacter((prev)=>!prev)}
          />
          <label>Character</label>
         </div>
          
        </div>

        </div>
    )
}
export default App