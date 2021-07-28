import React, {useState,useEffect} from 'react'
import {Row, Col} from 'react-materialize'
import {useAtom} from 'jotai'
import {clock} from '../Atoms'
function Timer(props){
    const[counter, setCount]=useState(120)
    const[timesUp, setEnd]=useState(false)
    const[time, setTime]=useState('high')
    const[timeEndM, setTmessage]=useState('')
    console.log(props.started)
    // useEffect(()=>{console.log(counter)
    //     console.log(counter,timesUp,props.started)
    //     if((counter > 0) && (timesUp===false)&&(props.started===true)){
    //         setTimeout(()=>{
    //             setCount(counter=>counter-1)
    //             setTmessage('')
    //             console.log(counter,)
    //         },1000)
    //     }
    //     if(counter===60){
    //         setTime('med')
    //         setTimeout(()=>{
    //             setCount(count=>count-1)
    //             console.log(counter)
    //         },1000)
    //     }else if(counter===30){
    //         setTime('low')
    //         setTimeout(()=>{
    //             setCount(count=>count-1)
    //             console.log(counter)
    //         },1000)
    //     }
    //     // else if(counter===0 && props.started===true){
    //     //     setTmessage('Make a Pick Now')
    //     //     setEnd(true)
    //     //     console.log(counter)
            
    //     // }
    //     else if(counter===0 && props.started===false){
    //         console.log(counter)
    //     }
    // },[])

    return(
        <div>
           {counter>0?<div>{Math.floor(counter/60)>=1?<span>< div className={time}>{Math.floor(counter/60)}:</div> <Col s={1} className={time}>{counter%60<10?'0'+counter%60:counter%60}</Col></span>:<div><Col s={1} className={time}>{counter%60<10?'0'+counter%60:counter%60}</Col></div>}</div>:<div className='timeout'>{timeEndM}</div>} 
            {/* {timeEndM.length>1?<div className='timeout'>{timeEndM}</div>:<div></div>} */}
        </div>
    )
}
export default Timer