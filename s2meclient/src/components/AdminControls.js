import React , {useState,useEffect} from 'react'
import {useAtom} from 'jotai'
import{user, draft} from '../Atoms'
import {Row,Col, Button} from 'react-materialize'

function AdminControls(){
    const [me, setMe]=useAtom(user)
    const [thisLeague, setThisLeague]=useAtom(draft)
    console.log(me)
    console.log(thisLeague)
    return(
        <div className= 'admin'>
            <Row>
            <Col s={12}>
                    <Button>Start Draft</Button>
                </Col>
                <Col s={12}>
                    <label className='adLabel'>Make Selection</label>
                    <input></input>   
                </Col>
                <Col s={12}>
                    <Button>End Draft</Button>
                </Col>
            </Row>
        </div>
    )
}
export default AdminControls
