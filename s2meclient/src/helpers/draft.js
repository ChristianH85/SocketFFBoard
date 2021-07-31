import socket from "../socketConfig"
const DraftApi={
    startDraft:(league)=>{
        // console.log(league,'started')
        socket.emit('startDraft',league)
    },
    endDraft:(league)=>{
        console.log(league,'ended')
        socket.emit('endDraft',league)
    },
    makePick:(player,draft_id,user_id,user_email)=>{
        const pick= {
            player:player,
            draft_id:draft_id,
            user_id:user_id,
            user_email:user_email
        }
        console.log(pick,'pick')
        socket.emit('selection',pick)
    },
    adminForcePick:()=>{},
    tradePick:()=>{}

}
export default DraftApi