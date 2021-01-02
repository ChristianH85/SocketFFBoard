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
                console.log(counter)
            },1000)
        }
        if(counter===60){
            setTime('med')
            setTimeout(()=>{
                setCount(counter-1)
                console.log(counter)
            },1000)
        }else if(counter===30){
            setTime('low')
            setTimeout(()=>{
                setCount(counter-1)
                console.log(counter)
            },1000)
        }
        else if(counter===0){
            setTmessage('Make a Pick Now')
            setEnd(true)
            
        }
    })

    return(
        <Row>
           {counter>0?<div>{Math.floor(counter/60)>=1?<span><Col s={1}className={time}>{Math.floor(counter/60)}:</Col> <Col s={1} className={time}>{counter%60<10?'0'+counter%60:counter%60}</Col></span>:<div><Col s={1} className={time}>{counter%60<10?'0'+counter%60:counter%60}</Col></div>}</div>:<div></div>} 
            {timeEndM.length>1?<Col s={12} className='timeout'>{timeEndM}</Col>:<div></div>}
        </Row>
    )
}
export default Timer