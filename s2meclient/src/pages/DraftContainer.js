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
import axios from 'axios'
import Picked from '../components/Picked'
function DraftContainer(){
    const [userInfo, setUInfo]=useAtom(user)
    const [leagueInfo, setLeagueInfo]=useAtom(draft)
    const [started, setStart]=useState(false)
    const[mine,setMine]=useState(false)
    const[available, setAvail]=useState(draft.available)
    useEffect(() => {
        axios.get(`/api/league/${leagueInfo._id}`).then(res=>{
            console.log(res)
            if(res.status===200){
                setLeagueInfo(res.data)
                if(res.data.status==='active'){
                    setStart(true)
                    evalPick(res.data.draftOrder[res.data.currentTurn-1])
                    
                }
            }else{console.log(res)}
            socket.emit('subscribe', leagueInfo._id)
        })
        socket.on('joined',data=>{
            console.log('Hello '+data)
            // setLeagueInfo(data)
        })
        socket.on('start',async data=>{
            console.log('started',data)
            // setUInfo(data.data)
            evalPick(data.draftOrder[data.currentTurn-1])
            setStart(true) 
        })
        socket.on('nextPick',async data=>{
            console.log('next',data)
            setAvail(data.available)
            evalPick(data.draftOrder[data.currentTurn-1])
            setLeagueInfo(data)
            console.log(leagueInfo)
            // DraftApi.nextPick(data._id)
        }) 
        socket.on('end',(data)=>{
            console.log(data)
            setStart(false)
            setMine(false)
            alert('Draft concluded')
        })
    },[])
    const evalPick=async(email)=>{
        
        let myTurn=await isMyPick(email)
        console.log(myTurn)
        setMine(myTurn)
    }
    const isMyPick=(email)=>{
        console.log(email,userInfo.email)
      return  email===userInfo.email?true: false
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
        <Timer pick={leagueInfo.currentTurn}/>
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
                    <DraftOrderBox order={leagueInfo.draftOrder} turn={leagueInfo.currentTurn-1}/>
                </Tab>
                <Tab 
                    key='Picked'
                    className='tabStyle'
                    options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                    }}
                    title="Picked"
                >
                    <Picked picks={leagueInfo.picked}/>
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
        </>
    )
}
export default DraftContainer