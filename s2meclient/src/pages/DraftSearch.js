import React, {useEffect,useState} from 'react';
import {Redirect} from 'react-router-dom'
import {Row,Col, Button, Icon} from 'react-materialize';
import {useAtom} from 'jotai';
import socket from '../socketConfig';
import axios from 'axios';
import {draft, user} from '../Atoms'

function DraftSearch(){
    const [leagueID, setLID]=useState('')
    const [cDraft, setDraft]=useAtom(draft)
    const [showBtn, setShowBtn]=useState(false)
    const [team,setTeam]= useAtom(user)
    const [errM, setErrM]= useState('')
    const [redirect, setRedirect]=useState(false)
    const [myLeagues, setLeagues]=useState([])
    const [tempL, setTemp]=useState('')
    useEffect(()=>{
        // console.log(team._id)
        axios.get('/api/user/'+team._id).then(res=>{
            // console.log(res.data.leagues.length)
            if(res.data.leagues.length>0){
                setLeagues(res.data.leagues)}
        })
    },[])
    const handleInput=(e)=>{
        e.preventDefault();
        setLID(e.target.value)
    }
    const handleSearch=(e)=>{
        e.preventDefault();
        axios.get('/api/league/'+leagueID).then((result)=>{
            console.log(result.data._id)
            if(result.data._id){
                const lObj= {
                    id: result.data._id,
                    commish:result.data.commish,
                    leagueName:result.data.leagueName,
                    round: 0,
                    trounds: result.data.numbRounds,
                    teams: result.data.teams,
                    messages:result.data.messages,
                    draftTime:result.data.draftTime,
                    currentPick: '',
                    availableP: [],
                    picked: [],
                    users:result.data.users
                }
                setTemp(lObj)
                evaluateCode()
                // console.log(cDraft)
                // console.log(data)
                // console.log(result)
            }
            else{ setErrM('No Matching Leages Found')}
        })
        // socket.emit('findL',leagueID)
    }
    const evaluateCode=()=>{
        if(team.leagues.length===0){
            setShowBtn(true)
        }
        else if(team.leagues.indexOf(leagueID)===-1){
            setShowBtn(true)
        }
        else{
            setShowBtn(false)
            setErrM('Already in this League')
        }

    }
    const handleSelect=(e)=>{
        e.preventDefault()
        const btnID= e.target.id
       if(btnID==='searched'){
        //    console.log(leagueID)
        //    console.log(team._id)
        const upObj={
            league:leagueID,
            user:team._id
        }
        axios.post('/api/user/leagues',upObj).then(data=>{
            // setDraft(data)
            // console.log(data)
            // setRedirect(true)
        })
    }else{
        
        
        axios.get('/api/league/'+e.target.id).then(data=>{
            setDraft(data.data)
            // console.log(data)
            // console.log('draft id')
            
            setRedirect(true)
        })
    }

    }
    return(
        <Row>
            {redirect?<Redirect push to='/draft'/>:<div></div>}
            <Col s={12} m={8} offset='m2'>
                <form className='findL'>
                    <Row id='search'>
                        <Col s={12}> Search Leagues:</Col>
                        <Col s={2} m={2} >
                            <label>Verify Code</label>
                        </Col>
                        <Col s={8} m={8} >
                            <input id ="lSearch"type='text' onChange={handleInput}></input>
                        </Col>
                        <Col s={2} m={2} >
                            <Button id='lBtn' onClick={handleSearch}>
                                <Icon large>search</Icon>
                            </Button>
                        </Col>
                        {errM.length>0?<Col s={12} className='errM'>{errM}</Col>:<div></div>}
                    </Row>
                    {showBtn?
                    <Row>
                        <Col s={12} m={12} offset='s2'>
                            <h3>Is This your League</h3>
                            <Button onClick={handleSelect} id='searched'>Go To {tempL.leagueName}</Button>
                        </Col>
                    </Row>:
                    <div></div>
                    }
                    <Row>
                        <Col s={12}> My Leagues:</Col>
                        {myLeagues.length>0?myLeagues.map((league,i)=>{
                        return(<Col s={12}  key={i}><Button id={league._id} onClick={handleSelect}>{league.leagueName}</Button></Col>)
                         })
                        :<div></div>}
                    </Row>
                </form>
            </Col>
        </Row>
    )
}
export default DraftSearch
