import React from 'react'
import {Row, Col} from 'react-materialize'
import {Link} from 'react-router-dom'
import {user} from '../Atoms'
import {useAtom} from 'jotai'

function Options(){
    const [currUser, setCurrentUser]= useAtom(user)
    // console.log(currUser)
    return(
        <div>        
            <Row>
                <Col s={6} offset='s3'>
                        <Link to='/loptions'>
                        <button className='optBtn'>
                            Create League
                        </button >
                        </Link>
                </Col>
                <Col s={6} offset='s3'>
                    <Link to='/search'>
                        <button className='optBtn'>
                            Find My League
                        </button >
                        </Link>
                </Col>
                <Col s={6} offset='s3'>
                    {currUser.leagues?currUser.leagues.length>0?
                    <Link to='/myLeagues'>
                        <button className='optBtn'>
                            My Leagues
                        </button >
                    </Link>:
                     null:null}  
                </Col>
                <Col s={6} offset='s3'>
                
                <Link to='/account'>
                        <button className='optBtn'>
                            Settings
                        </button >
                        </Link>                    
                </Col>
            </Row>
        </div>
    )
}
export default Options