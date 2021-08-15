import React from 'react'
import {Link} from 'react-router-dom'
import {user, draft} from '../Atoms'
import {useAtom} from 'jotai'
import { useHistory} from 'react-router-dom'
function MyLeagues(){
    const [cUser,setUser]=useAtom(user)
    const [cDraft, setDraft]=useAtom(draft)
    console.log(cUser)
    const history = useHistory();

    const handleLeague=(league)=>{
        setDraft(league)
        history.push('/draft')
    }
    return(
        <>
            {cUser.leagues.map(league=>{return (
                <div className='card' key={league._id}>
                    <div className='card-title'>
                        {league.leagueName}
                    </div>
                    <p>{league.status}</p>
                    <p>{league.draftTime}</p>
                    <button className='btn'id={league.id} onClick={()=>handleLeague(league)}>Go To Lobby</button>
                </div>
            )})}
        </>
        )
}
export default MyLeagues