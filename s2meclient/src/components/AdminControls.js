import React , {useState,useEffect} from 'react'
import {useAtom} from 'jotai'
import{user, draft} from '../Atoms'
import {Row,Col} from 'react-materialize'

function AdminControls(){
    const [me, setMe]=useAtom(user)
    const [thisLeague, setThisLeague]=useAtom(draft)
    console.log(me)
    console.log(thisLeague)
    return(
        <div className='container Admin'>
            <Row>
                <Col>
                </Col>
                <Col>
                </Col>
            </Row>
        </div>
    )
}
export default AdminControls
