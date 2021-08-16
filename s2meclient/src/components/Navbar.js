import React, {useState,useEffect} from 'react';
import FFDB from '../images/FFDB.png'
import {SideNav,SideNavItem} from 'react-materialize'
function NavBar(){
    return(
        <div>
            <SideNav
                id="SideNav-50"
                options={{
                draggable: true
                }}
                trigger={<img node='button' src={FFDB} id='navIcon'/>}
            >
                <SideNavItem
                user={{
                    background: 'https://placeimg.com/640/480/tech',
                    email: 'jdandturk@gmail.com',
                    image: 'static/media/react-materialize-logo.824c6ea3.svg',
                    name: 'John Doe'
                }}
                userView
                />
                {/* <SideNavItem
                href="#!icon"
                icon={<Icon>cloud</Icon>}
                > */}
                {/* First Link With Icon
                </SideNavItem> */}
                <SideNavItem href="#!second">
                Second Link
                </SideNavItem>
                <SideNavItem divider />
                <SideNavItem subheader>
                Subheader
                </SideNavItem>
                <SideNavItem
                href="#!third"
                waves
                >
                Third Link With Waves
                </SideNavItem>
            </SideNav>
        </div>
    )

}
export default NavBar