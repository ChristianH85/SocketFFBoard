import React from 'react'
import {useAtom} from 'jotai'
import {Tabs,Tab,Row,Col} from 'react-materialize'
import PlayerList from './PlayerL'
import Chatbox from './Chatbox'
import DraftOrderBox from './DraftOrderBox'
import AdminControls from '../components/AdminControls'

function DraftContainer(){
    
    return(
        <Row id ='tabs'>
            <Col s={12} m={8} offset='m2' className='tabCont' >

                <Tabs
                className="  z-depth-1"
                options={{
                    swipeable: true
                }}
                >
                <Tab
                    key='Players'
                    className='tabStyle'
                    options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                    }}
                    title="Admin"
                >
                    <AdminControls/>
                </Tab>
                <Tab
                    key='Players'
                    className='tabStyle'
                    options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                    }}
                    title="Players"
                >
                    <PlayerList />
                </Tab>
                <Tab
                    key='Draft Order'
                    className='tabStyle'
                    options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                    }}
                    title="Chat"
                >
                    <Chatbox />
                </Tab>
                <Tab 
                    key='Draft Order'
                    className='tabStyle'
                    options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                    }}
                    title="Draft Order"
                >
                    <DraftOrderBox />
                </Tab>
                </Tabs>
            </Col>
        
        </Row>
    )
}
export default DraftContainer