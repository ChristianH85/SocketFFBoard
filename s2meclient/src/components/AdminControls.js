import React , {useState,useEffect} from 'react'
import {useAtom} from 'jotai'
import{user, draft} from '../Atoms'
import {Row,Col} from 'react-materialize'

function AdminControls(){
    const [me, setMe]=useAtom(user)
    const [thisLeague, setThisLeague]=useAtom(draft)

    return(
        <div className='container'>
            
        </div>
    )
}
export default AdminControls