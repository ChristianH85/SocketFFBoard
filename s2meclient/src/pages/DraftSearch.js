import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom'
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
    console.log(team)
    const handleInput=(e)=>{
        e.preventDefault();
        setLID(e.target.value)
    }
    const handleSearch=(e)=>{
        e.preventDefault();
        console.log("5fef9995a385ae239cff66b9"+leagueID)
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
                    picked: []
                }
                setDraft(lObj)
                setShowBtn(true)
                console.log(cDraft)
                // console.log(data)
                console.log(result)
            }
        })
        // socket.emit('findL',leagueID)
    }
    const handleSelect=()=>{
        // console.log(leagueID)
        const upObj={
            league:leagueID,
            user:team._id
        }
        axios.post('/api/user/leagues',upObj).then(data=>{
            console.log(data)
        })
        // if(cDraft.commish===team._id){
        //     socket.emit('findL',leagueID)
        // }

    }
    return(
        <Row>
            <Col s={12} m={8} offset='m2'>
                <form className='findL'>
                    <Row id='search'>
                        <Col s={2} m={2} >
                            <label>Verify Code</label>
                        </Col>
                        <Col s={8} m={7} >
                            <input id ="lSearch"type='text' onChange={handleInput}></input>
                        </Col>
                        <Col s={2} m={2} >
                            <Button id='lBtn' onClick={handleSearch}>
                                <Icon large>search</Icon>
                            </Button>
                        </Col>
                    </Row>
                    {showBtn?
                    <Row>
                        <Col s={12} m={8} offset='s2'>
                            <h3>Is This your League</h3>
                            <Link to='/draft'><Button onClick={handleSelect}>Go To {cDraft.leagueName}</Button></Link>
                        </Col>
                    </Row>:
                    <div></div>
                    }
                </form>
            </Col>
        </Row>
    )
}
export default DraftSearch
