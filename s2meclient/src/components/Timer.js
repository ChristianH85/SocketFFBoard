import React, {useState,useEffect} from 'react'

function Timer(){
    const[counter, setCount]=useState(70)
    const[timesUp, setEnd]=useState(false)
    const[time, setTime]=useState('high')
    useEffect(()=>{
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
        if((counter >0&&timesUp===false) || counter!==60|| counter!==30){
            setTimeout(()=>{
                setCount(counter-1)
                console.log(counter)
            },1000)
        }
        
        else if(counter===0){
            console.log("Make a Pick Now")
            setEnd(true)
            
        }
    })

    return(
        <div>
            <h2 id='timer' className={time}>{counter}</h2>
        </div>
    )
}
export default Timer