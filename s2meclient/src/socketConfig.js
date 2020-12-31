import openSocket from 'socket.io-client';
import {port} from './Atoms'
console.log(port)
const socket = openSocket(port);

export default socket;