import React from 'react'
import {Link} from 'react-router-dom'
import {user, draft} from '../Atoms'
import {useAtom} from 'jotai'
import { useHistory} from 'react-router-dom'
import {Row, Col} from 'react-materialize'
import axios from 'axios'

function MyLeagues(){
    const [cUser,setUser]=useAtom(user)
    const [cDraft, setDraft]=useAtom(draft)
    console.log(cUser)
    const history = useHistory();

    const handleLeague=async(league)=>{
        let data=await axios.get(`/api/league/${league._id}`)
        console.log(data)
        setDraft(data.data)
        history.push('/draft')
    }
    return(
        <>
            {cUser.leagues.map((league,i)=>{return (
                <Row key={i}>
                    <Col s={6} offset='s3'>
                        <div className='card' key={league._id}>
                        <div className='card-title'>
                            {league.leagueName}
                        </div>
                        <p>{league.status}</p>
                        <p>{league.draftTime}</p>
                        <button className='btn'id={league.id} onClick={()=>handleLeague(league)}>Go To Lobby</button>
                        </div>
                    </Col>

                </Row>
                
            )})}
        </>
        )
}
export default MyLeagues