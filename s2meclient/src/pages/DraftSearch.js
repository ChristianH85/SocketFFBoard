import React, {useEffect,useState} from 'react';
import {Row,Col, Button, Icon} from 'react-materialize';
import {useAtom} from 'jotai';
import socket from '../socketConfig'

function DraftSearch(){
    const [leagueID, setLID]=useState('')
    const handleInput=(e)=>{
        e.preventDefault();
        setLID(e.target.value)
    }
    const handleSearch=(e)=>{
        e.preventDefault();
        socket.emit('findL',leagueID)
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
                </form>
            </Col>
        </Row>
    )
}
export default DraftSearch
