import socket from "../socketConfig"
const DraftApi={
    startDraft:(league)=>{
        console.log(league,'started')
        socket.emit('startDraft',league)
    },
    endDraft:(league)=>{
        console.log(league,'ended')
        socket.emit('endDraft',league)
    },
    makePick:(league)=>{
        console.log(league,'pick')
        socket.emit('selection',league)
    },
    adminForcePick:()=>{},
    tradePick:()=>{}

}
export default DraftApi