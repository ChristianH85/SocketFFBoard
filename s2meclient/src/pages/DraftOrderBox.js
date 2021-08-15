import React, {useState,useEffect} from 'react'
import {Col, Row} from 'react-materialize'
import Timer from '../components/Timer'
import {draft} from '../Atoms'
import {useAtom} from 'jotai'
import socket from '../socketConfig'
function DraftOrderBox(props){
    const[live, setLive]= useAtom(draft)
   
    const [round, setRound]=useState(live.round)
    const [pick, Pick]=useState(live.currentPick)
    const[draftOrder , setDraftOrder]=useState([])
    const [myPick, setMyPick] = useState(false)
    const [pickClass, setPickC] = useState('teams')
    // const [current, setPick]=useAtom(draft.currentPick)
    useEffect(()=>{
        snake()
        // socket.on('setMyPick',()=>{
        //     setMyPick(true)
        // })
        setClass()
        // socket.emit('submitPick')
    }, [])

const snake=()=>{
    const order=[]
    console.log(live.numbRounds)
    for(let i =1 ;i<live.numbRounds;i++){
        // if(i===0){
        //     const zOrder=live.teams
            
        //     zOrder.forEach(team =>order.push(team))
        // }
        
         if ((i)%2!==0){
            const nOrder=live.teams
            console.log(nOrder)
            nOrder.forEach(team =>order.push(team))
            // setDraftOrder(prev=>[...prev, nOrder])

        }
        else if((i)%2===0){
            const rOrder=live.teams.reverse()
            rOrder.forEach(team =>order.push(team))
            console.log(rOrder)
            // setDraftOrder(prev=>[...prev, rOrder])
            

        }
        // console.log(order) 
    }
   setDraftOrder(order)
}
const setClass=()=>{
    switch(myPick){
        case true:
            return'myPick'
        case false:
            return'teams'
        default:
            console.log('default')
    }
}
    return (   
            <div >
                {/* <Row className='currDRow'>
                    <Col s={12}>
                        <Timer time={props.time}started={props.started}/>
                    </Col>
                </Row>  */}
                {/* <div className='orderBox'> */}
                    {/* <Col s={2}>
                        <Timer/>
                    </Col> */}
                    <Col s={2} className='noMar'>
                        <Timer/>
                    </Col>
                    <Col s={10} className='noMar'>
                    <div className='orderBox'>
                    {/* {draftOrder?draftOrder.map((team, i)=>{
                        
                            {draftOrder[i].map((team, i)=>{
                                return(<div key={i} className='teams'>{team}</div>)
                            })}
                        
                    }):<div></div>} */}
                    {draftOrder?draftOrder.map((team, i)=>{

                        return(                            
                                <div key={i} id={i===0?'current':'upcoming'} className={pickClass}>{team}</div>                                                      
                              )
                    })
                   
                    :<div></div>}
                    </div>
                    </Col>
                {/* </div>                */}
            </div>
            )
}
export default DraftOrderBox