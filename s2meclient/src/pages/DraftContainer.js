import React,{useState, useEffect} from 'react'
import {useAtom} from 'jotai'
import {Tabs,Tab,Row,Col} from 'react-materialize'
import PlayerList from './PlayerL'
import Chatbox from './Chatbox'
import DraftOrderBox from './DraftOrderBox'
import AdminControls from '../components/AdminControls'
import socket from "../socketConfig";
import {user} from '../Atoms'
import {draft} from '../Atoms'
import{clock} from '../Atoms'
function DraftContainer(){
    const [userInfo, setUInfo]=useAtom(user)
    const [leagueInfo, setLeagueInfo]=useAtom(draft)
    const[timeLeft,setTime]=useState(0)
    const [started, setStart]=useState(false)
    const[time, setTimeL]=useState('high')
    
    // console.log(userInfo)
    // console.log(leagueInfo)
    useEffect(() => {
        
        // if((counter > 0) && (timesUp===false)&&(props.started===true)){
        //     setTimeout(()=>{
        //         setCount(counter=>counter-1)
        //         setTmessage('')
        //         console.log(counter,)
        //     },1000)
        // }
        // if(counter===60){
        //     setTime('med')
        //     setTimeout(()=>{
        //         setCount(count=>count-1)
        //         console.log(counter)
        //     },1000)
        // }else if(counter===30){
        //     setTime('low')
        //     setTimeout(()=>{
        //         setCount(count=>count-1)
        //         console.log(counter)
        //     },1000)
        // }
        // else if(counter===0 && props.started===true){
        //     setTmessage('Make a Pick Now')
        //     setEnd(true)
        //     console.log(counter)
            
        // }
        // else if(counter===0 && props.started===false){
        //     console.log(counter)
        // }
        socket.on('start',data=>{
            console.log('started',data)
            setTime(119)
            setStart(true)
        })
        
    },[])
    useEffect(()=>{
        if(started){
        checkTime()}},[])
    const decrement=()=>{
        setTimeout(setTime((time)=>{time--}),1000)
        // setTime((time)=>{time--})
        console.log(timeLeft)
    }
    socket.on('start',data=>{
        console.log('started',data)
        setTime(119)
        setStart(true)
    })
    const checkTime=()=>{
        let time=timeLeft
        switch(time){
            case time>60 && started===true:
                decrement()
                break;
            case time===0 && started===false:
                break;


            
        }
    }
    return(
        <>
        <Row id ='tabs'>
            <Col s={12} m={8} offset='m2' className='tabCont' >

                <Tabs
                className="  z-depth-1"
                options={{
                    swipeable: true
                }}
                >              
                <Tab
                    key='Players'
                    className='tabStyle'
                    options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                    }}
                    title="Players"
                >
                    <PlayerList draft={leagueInfo} updateDraft={setLeagueInfo} updateUser={setUInfo} user={userInfo}/>
                </Tab>
                <Tab
                    key='Chat'
                    className='tabStyle'
                    options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                    }}
                    title="Chat"
                >
                    <Chatbox />
                </Tab>
                <Tab 
                    key='Draft Order'
                    className='tabStyle'
                    options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                    }}
                    title="Draft Order"
                >
                    <DraftOrderBox />
                </Tab>
                {userInfo._id===leagueInfo.commish?
                    <Tab
                    key='Admin'
                    className='tabStyle'
                    options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                    }}
                    title="Admin"
                >
                    <AdminControls/>
                </Tab>:
                <div></div>
                    }
                </Tabs>
            </Col>
        
        </Row>
        <DraftOrderBox started={started}time={timeLeft}/>
        </>
    )
}
export default DraftContainer