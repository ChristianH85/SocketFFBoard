import React,{useState} from 'react';
import { ChannelList } from './ChannelList';
// import './chat.scss';
function Chat2(){
    const [channels,setChannels]= useState([{ id: 1, name: 'first', participants: 10 }])
    return (
                    <div>
                         <div classname="chat-app"></div>
        ‍
                            <ChannelList channels={channels}></ChannelList>
        ‍
                    </div>
                       
                        
                    );

}
    // const [channels,setChannels]= useState([{ id: 1, name: 'first', participants: 10 }])
        // state = {
        //     channels: [{ id: 1, name: 'first', participants: 10 }]
        // }
        // render() {
//             return (
//             <div>
//                  <div classname="chat-app"></div>
// ‍
//                     <channellist channels="{this.state.channels}"></channellist>
// ‍
//             </div>
               
                
//             );
        // }

export default Chat2