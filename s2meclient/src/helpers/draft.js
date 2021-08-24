import socket from "../socketConfig"
import axios from 'axios'
const DraftApi={
    startDraft:(league)=>{
        // console.log(league,'started')
        socket.emit('startDraft',league)
    },
    // nextPick:(room)=>{
    //     socket.emit('stop-timer')
    //     setTimeout(()=>{
    //         socket.emit('start-timer',room)
    //     },3000)
    // },
    endDraft:(league)=>{
        console.log(league,'ended')
        socket.emit('endDraft',league)
    },
    makePick:(player,draft_id,user_id,user_email,avail,picked, currentTurn)=>{
        const pick= {
            player:player,
            draft_id:draft_id,
            user_id:user_id,
            user_email:user_email,
            available:avail,
            picked:picked,
            currentTurn:currentTurn
        }
        console.log(pick,'pick')
        socket.emit('selection',pick)
    },
    adminForcePick:()=>{

    },
    tradePick:()=>{},
    refreshLeague:(id)=>{
        axios.get(`/api/league/${id}`).then(res=>{
            console.log(res)
            if(res.status===200){
                console.log(res.status)
                return res.data
            }else{console.log(res)}

        })
    },
    snake:(tList,rounds)=>{
        const order = [];
        console.log(rounds);
        for (let i = 1; i <= rounds; i++) {
          if (i % 2 !== 0) {
            tList.forEach((team) => order.push(team));
          } else if (i % 2 === 0) {
            const rOrder = tList.reverse();
            rOrder.forEach((team) => order.push(team));
            console.log(rOrder);
          }
        }
        console.log();
        return order;
    }

}
export default DraftApi