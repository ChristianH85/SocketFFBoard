import React, {useEffect} from 'react';
import FFDB from '../images/FFDB.png'
import field from '../images/field.jpg'
import {SideNav,SideNavItem, Button, Row} from 'react-materialize'
import {Link, useHistory} from 'react-router-dom'

function NavBar(props){
    const {status, user, setLogin}=props
    const history = useHistory()
    useEffect(()=>{
        if (status){

        }
        
    },[status,user])
    const handleLogout=()=>{
        localStorage.removeItem('jwt-id');
        localStorage.removeItem('user');
        setLogin(false);
        history.push('/')
    }
    return(
        <div>
            <SideNav
                id="SideNav-50"
                options={{
                draggable: true
                }}
                trigger={<img node='button' src={FFDB} id='navIcon'/>}
            >
                {!status?
                <div>
                    <Row>
                        <Link to='/signup'>SignUp</Link>
                    </Row>
                    <Row>
                        <Link to='/'>Login</Link>
                    </Row>
                </div>:
                <>               
                <SideNavItem
                user={{
                    background: field,
                    image: user.avatar?user.avatar:FFDB,
                    name: user.username
                }}
                userView
                />
                <Row >
                    <Link to='/'>Home</Link>
                </Row>
                <Row>
                    <Link to='/search'>Search Leagues</Link>
                </Row>
                <Row>
                    <Link to='/myLeagues'>My Drafts</Link>
                </Row>
                <Row>
                    <Link to='/loptions'>Set Up New</Link>
                </Row>
                <Row>
                    <Link to='/account'>Settings</Link>
                </Row>
                <Row>
                    <Button onClick={handleLogout}>Logout</Button>
                </Row>
                </>
                }
            </SideNav>
        </div>
    )

}
export default NavBar