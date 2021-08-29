import React, {useState} from 'react';
import {useAtom} from 'jotai';
import {user} from '../Atoms';
import {Row, Col, Button} from 'react-materialize'
import axios from 'axios'
function Account(){
    const [showNPass, setNPassShow]=useState(false)
    const [showUpName, showUp]=useState(false)
    const [uName,setUName]= useState('')
    const[nPass,setNPass]=useState('')
    const[nPass1,setNPass1]=useState('')
    const[imgData, setImgD]=useState('')
    const[userInfo,setUser]=useAtom(user)
    const [showUpBtn, setUpBtn]=useState('')
    const [errM, setErrM]=useState('')
    const handleSel=(e)=>{
        e.preventDefault();
        let name = e.target.name
        if(name==='setP'){
            showUp(false)
            setNPassShow(true)
        }else if(name==='setU'){
            setNPassShow(false)
            showUp(true)
        }
    }
    const handleIChange=(event)=>{
        // console.log(event.target.files[0])
        setImgD(event.target.files[0])
        setUpBtn(true)
      }
      const handlefile=(event)=>{
        event.preventDefault()
        var formData = new FormData();
        formData.append('file',imgData );

        axios.post('/api/user/avatar/'+userInfo._id,formData).then((response)=>{
        //   console.log (response)
          if(response.status===200){
              setUser(response.data)
          }else{
              setErrM('something didnt work with that picture maybe it you!')
          }
          
        })
       
    }
    const handlePChange=(e)=>{
        e.preventDefault();
        if (nPass===nPass1&& nPass.length>=6){
            console.log('equalll')
        }
        else if(nPass.length<6){
            console.log(nPass,nPass1)
            setErrM('Password is too short')
        }
        else if(nPass!==nPass1){
            setErrM('Passwords do not Match')
        }
    }
    const handleUChange=(e)=>{
        e.preventDefault();
        if(uName.length<1){
            setErrM('username has no input')
        }
        console.log(uName)
    }
    return(
        <Row>
            <Col s={12}>
                <label className='adLabel'>Add avatar</label>
                <input type='file' onChange={handleIChange} accept="image/png, image/jpeg"/>
                    {showUpBtn?<Button onClick={handlefile}>Change Avatar</Button>:null}
            </Col>
            <Col s={12} m={8} offset='m2'>
                <form>{showNPass?
                    <div>{errM?<p>{errM}</p>:<></>}
                        <label>New Password</label>
                        <input type='password' onChange= {e=>{setNPass(e.target.value)}}></input>
                        <br/>
                        <label>New Password 1 more Time</label>
                        <input type='password' onChange= {e=>{setNPass1(e.target.value)}}></input>
                        <Button onClick={handlePChange}>Update Password</Button>
                    </div>:showUpName?
                        <div>
                            {errM?<p>{errM}</p>:<></>}
                        <label>New Username</label>
                        <input type='text' onChange= {e=>{setUName(e.target.value)}}></input>
                        <Button onClick={handleUChange}>Update UserName</Button>
                    </div>:
                    <div>
                        <Button name='setU' onClick={handleSel}>Change UserName</Button>
                        <br/>
                        <Button name='setP' onClick={handleSel}>Change Password</Button>
                    </div>}
                </form>
            </Col>
        </Row>
    )

}
export default Account