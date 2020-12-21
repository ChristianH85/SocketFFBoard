import React,{useState} from 'react';
import axios from 'axios';
import { Button, Card, Col, Row } from 'react-materialize'
import useSocket from 'use-socket.io-client'
import Login from './Login';
import SignUp from './SignUp';
import Chatbox from './Chatbox';
import PlayerList from './PlayerL';
import LeagueOptions from './LeagueOptions';
import DraftOrderBox from './DraftOrderBox';
import ex from '../images/ex.mp3'
import Dropzone from 'react-dropzone'
import Chat2 from '../Chat2/Chat2';
function Landing(){
    const [ loginP, switchL] = useState(true)
    const[incoming, setIncoming]=useState([])
        const endpoint= process.env.Port || 'http://127.0.0.1:3001'
        // const socket = socketIOClient(endpoint);
        const [socket] = useSocket(endpoint)
        socket.connect();
        // console.log(socket)
        const handleFChange=acceptedFiles => {
            acceptedFiles.forEach((file) => {
                const reader = new FileReader()
           
                reader.onabort = () => console.log('file reading was aborted')
                reader.onerror = () => console.log('file reading has failed')
                reader.onload = () => {
                // Do whatever you want with the file contents
                  const binaryStr = reader.result
                  console.log(reader.result)
                  socket.emit("img", file)
                }
                // socket.emit("img", binaryStr)
                console.log(file.path)
                reader.readAsArrayBuffer(file)
              })
        }
        socket.on('connected',data=>{
            // debugger
          console.log('connected')
        })
        socket.on('user', data=>{
            console.log("######################User"+data)
            // const user= data.user
            
        })
        const handleOutMessage=(data)=>{
            socket.emit('outgoingMsg', data)
        }
        socket.on('incomingMsg',data=>{
            let tempL=[]
            let msgData={
                msg:data.msg,
                time:data.time
            }
            tempL.push(msgData)
            console.log('message data:'+data.msg)
            console.log(tempL)
            setIncoming(tempL)
            console.log(incoming)
        })
        // const login=(data)=>{
        //             let email=data.email
        //             let pword= data.password
        //             console.log(email,pword)
        //             socket.emit('login', {email,pword} )
        //         }
        // const signup=(data)=>{
        //     let usr=data.username
        //     let email = data.email
        //     let pword= data.password
        //     console.log(usr,email,pword)
        //     socket.emit('newUser', {usr, email,pword} )
        // }
return(
    <div className= 'home valign-wrapper center-align'>
        <Row >
            <Col s={12} md={7} lg={7}>
                <Chat2></Chat2>
            {/* <Card className='splash'>
                {loginP===true?
                    <div>
                        <Login lUser={login}/>
                        <br/>
                        <Button type ='button' onClick={()=>{switchL(false)}}>Sign Up</Button>
                    </div>
                    :
                    <div>
                        <SignUp nUser={signup}/>
                        <br/>
                        <Button type ='button' onClick={()=>{switchL(true)}}>Login</Button>
                    </div>
                }
            </Card> */}
            
            <Chatbox {...socket} handleOut={handleOutMessage}/>
            </Col>
            {/* <audio src={ex}exwidth="400" height="38" controls > */}
            {/* <Dropzone onDrop={handleFChange}> */}
       {/* {({getRootProps, getInputProps}) => (
         <section>
           <div {...getRootProps()}>
             <input {...getInputProps()} />
             <p>Drag 'n' drop some files here, or click to select files</p>
           </div>
         </section>
       )}
     </Dropzone> */}
    {/* <a href={ex} download='ex.mp3'>git a song</a> */}
    {/* </audio> */}
            {/* <div><a href={ex} download='ex.mp3'>git a song</a></div> */}
            {/* <LeagueOptions/> */}
            <Col s={12} md={5} lg={5}> 
                <LeagueOptions/>
            {/* <PlayerList className='pTable'/> */}
            <DraftOrderBox/>
            </Col> 
        </Row>
    </div>
)
}
export default Landing