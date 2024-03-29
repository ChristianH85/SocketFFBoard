import React from 'react'
import {Row, Col, Card, Button} from 'react-materialize'
import {Link} from 'react-router-dom'
import {user} from '../Atoms'
import {useAtom} from 'jotai'

function Options(){
    const [currUser, setCurrentUser]= useAtom(user)
    // console.log(currUser)
    return(
        <div>
            <h3 className='userName'>Welcome: {currUser.username}</h3>
            <Row>
                <Col s={12} >
                    <Card>
                        <Link to='/loptions'>
                        <Button>
                            Create League
                        </Button>
                        </Link>
                    </Card>
                </Col>
                <Col s={12} >
                <Card>
                    <Link to='/search'>
                        <Button>
                            Find My League
                        </Button>
                        </Link>
                    </Card>
                </Col>
                <Col s={12} >
                <Card>
                    {currUser.leagues.length>0?
                    <Link to='/draft'>
                        <Button>
                            My Leagues
                        </Button>
                    </Link>:
                     <Link to='/search'>
                     <Button>
                         My Leagues
                     </Button>
                     </Link>}
                    </Card>
                </Col>
                <Col s={12} >
                <Card>
                <Link to='/account'>
                        <Button>
                            Settings
                        </Button>
                        </Link>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
export default Options