import React, {useState,useEffect} from 'react'
import {Row, Col} from 'react-materialize'
function Timer(){
    const[counter, setCount]=useState(10)
    const[timesUp, setEnd]=useState(false)
    const[time, setTime]=useState('high')
    const[timeEndM, setTmessage]=useState('')
    useEffect(()=>{
        if(counter > 0 && timesUp===false){
            setTimeout(()=>{
                setCount(counter-1)
                setTmessage('')
                // console.log(counter)
            },1000)
        }
        if(counter===60){
            setTime('med')
            setTimeout(()=>{
                setCount(counter-1)
                // console.log(counter)
            },1000)
        }else if(counter===30){
            setTime('low')
            setTimeout(()=>{
                setCount(counter-1)
                // console.log(counter)
            },1000)
        }
        else if(counter===0){
            setTmessage('Make a Pick Now')
            setEnd(true)
            
        }
    })

    return(
        <div>
           {counter>0?<div>{Math.floor(counter/60)>=1?<span>< div className={time}>{Math.floor(counter/60)}:</div> <Col s={1} className={time}>{counter%60<10?'0'+counter%60:counter%60}</Col></span>:<div><Col s={1} className={time}>{counter%60<10?'0'+counter%60:counter%60}</Col></div>}</div>:<div></div>} 
            {timeEndM.length>1?<div className='timeout'>{timeEndM}</div>:<div></div>}
        </div>
    )
}
export default Timer