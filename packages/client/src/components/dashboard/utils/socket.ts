import {io,Socket} from 'socket.io-client'
import { PORT } from '@my-app/shared'


const socket:Socket = io(`http://localhost:${PORT.server}`)




socket.on('join_room',()=>{})