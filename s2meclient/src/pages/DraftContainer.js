import React, {useState} from 'react'
import {useAtom} from 'jotai'
import {Tabs,Tab,Row,Col} from 'react-materialize'
import PlayerList from './PlayerL'
import Chatbox from './Chatbox'
import DraftOrderBox from './DraftOrderBox'

function DraftContainer(){
    return(
        <Row id ='tabs'>
            <Col s={12} m={8} offset='m2' >
                <Tabs
                className="  z-depth-1"
                options={{
                    swipeable: true
                }}
                >
                <Tab
                    // className="blue"
                    options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                    }}
                    title="Players"
                >
                    <PlayerList className='tabStyle'/>
                </Tab>
                <Tab
                    // active
                    // className="red"
                    options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                    }}
                    title="Chat"
                >
                    <Chatbox className='tabStyle'/>
                </Tab>
                <Tab
                    // className="green"
                    options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                    }}
                    title="Draft Order"
                >
                    <DraftOrderBox className='tabStyle'/>
                </Tab>
                </Tabs>
            </Col>
        
        </Row>
    )
}
export default DraftContainer