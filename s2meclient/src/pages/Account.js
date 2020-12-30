import React, {useState,useEffect} from 'react';
import {useAtom} from 'jotai';
import {user} from '../Atoms';
import {Row, Col, Button, Card} from 'react-materialize'

function Account(){
    const [showNPass, setNPassShow]=useState(false)
    const[nPass,setNPass]=useState('')
    const[nPass1,setNPass1]=useState('')
    const[user,setUser]=useAtom(user)
    const [oEmails, setOemails]=useState('')
    const [errM, setErrM]=useState('')
    const handleNP=(e)=>{
        e.preventDefault();
        setNPassShow(true)
    }
    const handlePChange=(e)=>{
        e.preventDefault();
        if (nPass===Npass1){
            console.log('equalll')
        }
        else{
            console.log(nPass,nPass1)
            setErrM('New passwords do not Match')
        }
    }
    return(
        <Row>
            <Col s={12} m={8} offset='m2'>
                <Card>{showNPass?
                    <div>
                        <label>Old Password</label>
                        <input type='text'></input>
                        <br/>
                        <label>New Password</label>
                        <input type='password' onChange= {e=>{setNPass(e.target.value)}}></input>
                        <br/>
                        <label>New Password 1 more Time</label>
                        <input type='password' onChange= {e=>{setNPass1(e.target.value)}}></input>
                        <Button onClick={handlePChange}>Change Passowrd</Button>
                    </div>:
                    <Button onClick={handleNP}>Change Password</Button>}
                </Card>
            </Col>
        </Row>
    )

}
export default Account