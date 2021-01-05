import openSocket from 'socket.io-client';
import {port} from './Atoms'

const socket = openSocket(port);

export default socket;