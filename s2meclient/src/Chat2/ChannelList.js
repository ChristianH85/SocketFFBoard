import React,{useState,useEffect} from 'react';
import { Channel } from './Channel';
function ChanneList(props){
    const [list,setList]= useState(<p>There is no channels to show</p>)
    useEffect=()=>{
        if (props.channels) {
            setList(props.channels)
        }
    },[]
    return <div classname="channel-list">{list.map(c => <Channel key={c.id} id={c.id} name={c.name} participants={c.participants}></Channel>)}</div>
}
export default ChanneList;
// export class ChannelList extends React.Component {
//     render() {
        
//         let list = `There is no channels to show`;
//         if (this.props.channels) {
//             list = this.props.channels.map(c => <channel key="{c.id}" id="{c.id}" name="{c.name}" participants="{c.participants}">);</channel>
//         }
//         return (
//             <div classname="channel-list"></div>
// ‍
//                 {list}
// ‍
//             );
//         }
// ‍}

