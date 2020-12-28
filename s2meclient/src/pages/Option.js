import React from 'react'
import {Row, Col, Card, Button} from 'react-materialize'
import {Link} from 'react-router-dom'


function Options(){
    
    return(
        <div>
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
                <Link to='/draft'>
                        <Button>
                            My League
                        </Button>
                        </Link>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
export default Options