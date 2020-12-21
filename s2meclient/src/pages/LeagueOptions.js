import React, {useEffect,useContext, useState} from 'react'
import {Card, TextInput, Button, Select} from 'react-materialize'
import Dropzone from 'react-dropzone'
function LeagueOptions(){
    const [leagueName, setLName]=useState('')
    const [numP, setLNumP]=useState(0)
    // const [pNum, setPNum]=useState('')
    let [rounds,setRounds]=useState(17)
    let [ePlayers, setEPlay]=useState(12)
    const handleOption=(e)=>{
        let val= e.target.value
        const emailList=Array(parseInt(val))
        if(emailList.length>0){
        console.log(emailList)}
        setLNumP(val)
    }
    const handleInput=(e)=>{
        let val= e.target.value
        let name=e.target.name
        if(name==="setLName"){
            setLName(val)
        }
        else if(name==="setPNum")
        console.log(val)
            setLNumP(val)
    }
    
    const handleFChange=acceptedFiles => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
       
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
            // Do whatever you want with the file contents
              const binaryStr = reader.result
              console.log(reader.result)
            }
            reader.readAsArrayBuffer(file)
          })
    }
    
    // console.log(emailList)
    return(
        <div className='leagueForm'>
            <form >
                    <TextInput label='League Name' name="setLName" onChange={handleInput} value={leagueName}></TextInput>
                
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
                    }} value={numP.toString()} onChange={handleOption}>
                    <option disabled value=""># of players</option>
                    {[...Array(12)].map((u,i)=>{
                        let x=i+1
                        return(
                            <option key={x.toString()} value={x.toString()}>{x}</option>
                        )
                    })}
                    {/* <option value="1">1</option>
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
                    <option value="12">12</option> */}
                    </Select>
                    <TextInput label="Total Picks" name="setPNum" onChange={handleInput}></TextInput>
                    
                {numP>1?[...Array(parseInt(numP))].map((u,i)=>{
                    // console.log(u,i)
                    let x=i+1
                    return(
                    <div key={i.toString()}className='row'>
                        <div className="col s8 m6">
                        <TextInput label={"Player Email # "+x.toString()} id={i.toString()} type="email"></TextInput>
                        </div>
                    </div>)}
                
       ):<div><Dropzone onDrop={handleFChange}>
       {({getRootProps, getInputProps}) => (
         <section>
           <div {...getRootProps()}>
             <input {...getInputProps()} />
             <p>Drag 'n' drop some files here, or click to select files</p>
           </div>
         </section>
       )}
     </Dropzone></div>}
            </form>
        </div>
    )
    
}
export default LeagueOptions