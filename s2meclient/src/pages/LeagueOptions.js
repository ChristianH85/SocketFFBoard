import React, {useEffect,useContext} from 'react'
import {Card, TextInput, Button, Select} from 'react-materialize'
function LeagueOptions(){
    return(
        <div className='leagueForm'>
            <form >
                    <TextInput label='League Name'></TextInput>
                
                    <Select
                    // id="Select-9"
                    multiple={false}
                    options={{
                        classes: '',
                        dropdownOptions: {
                        alignment: 'left',
                        autoTrigger: true,
                        closeOnClick: true,
                        constrainWidth: true,
                        coverTrigger: true,
                        hover: false,
                        inDuration: 150,
                        onCloseEnd: null,
                        onCloseStart: null,
                        onOpenEnd: null,
                        onOpenStart: null,
                        outDuration: 250
                        }
                    }}value="">
                    <option disabled value=""># of players</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    </Select>
                
            </form>
        </div>
    )
    
}
export default LeagueOptions