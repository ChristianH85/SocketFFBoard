import React,{useState, useEffect} from 'react'
import {useAtom} from 'jotai'
import {Tabs,Tab,Row,Col} from 'react-materialize'
import PlayerList from './PlayerL'
import Chatbox from './Chatbox'
import DraftOrderBox from './DraftOrderBox'
import AdminControls from '../components/AdminControls'
import Timer from '../components/Timer'
import socket from "../socketConfig";
import {user} from '../Atoms'
import {draft} from '../Atoms'
import DraftApi from "../helpers/draft";
import{clock} from '../Atoms'
function DraftContainer(){
    const [userInfo, setUInfo]=useAtom(user)
    const [leagueInfo, setLeagueInfo]=useAtom(draft)
    const[timeLeft,setTime]=useState(0)
    const [started, setStart]=useState(false)
    const[time, setTimeL]=useState('high')
    const[mine,setMine]=useState(false)
    
    // const [players,setPlayers]=useState(PlayerList)
    // console.log(userInfo)
    // console.log(leagueInfo)
    useEffect(async() => {
        
        if(leagueInfo.status==='active'){
            
            let email =leagueInfo.draftOrder[leagueInfo.currentTurn-1]
            let myTurn=await isMyPick(email)
            console.log(myTurn)
            setMine(myTurn)
            setStart(true)
        }
        socket.on('start',async data=>{
            console.log('started',data)
            let email =data.draftOrder[data.currentTurn-1]
            let myTurn=await isMyPick(email)
            console.log(myTurn)
            setMine(myTurn)
            ///trigger starting pick timer and make pick buttons active 
            // setTime(119)
            setStart(true)
            
        })
        socket.on('nextPick',async data=>{
            console.log('next',data)
            let email =data.draftOrder[data.currentTurn-1]
            let myTurn=await isMyPick(email)
            console.log(myTurn)
            setMine(myTurn)
            setLeagueInfo(prevState=>({
                ...prevState,
                availableP:data.available,
                draftOrder:data.draftorder,

            }))
            // let email =leagueInfo.draftOrder[0]
            // let myTurn=await isMyPick(email)
            // console.log(myTurn)
            // setMine(myTurn)
            ///trigger starting pick timer and make pick buttons active 
            DraftApi.nextPick(data._id)
        }) 

    },[])
    useEffect(()=>{
        if(started){
        checkTime()}},[timeLeft])
    const decrement=()=>{
        setTimeout(setTime(()=>{time-=1}),1000)
        // setTime((time)=>{time--})
        console.log(timeLeft)
    }
    // socket.on('start',async data=>{
    //     console.log('started',data)
    //     let email =data.draftOrder[0]
    //     let myTurn=await isMyPick(email)
    //     console.log(myTurn)
    //     ///trigger starting pick timer and make pick buttons active 
    //     setTime(119)
    //     setStart(true)
    // })
    const isMyPick=(email)=>{
        console.log(email,userInfo.email)
      return  email===userInfo.email?true: false
    }
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
    const isMine=()=>{
        console.log(started,mine)
        if(!started){
            return false;
        }else if(started&&mine){
            console.log('Mine')
            return true;
        }else{
            return false
        }
    }
    return(
        <>
        <Timer />
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
                    <PlayerList status={isMine()} draft={leagueInfo} updateDraft={setLeagueInfo} updateUser={setUInfo} user={userInfo}/>
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