import express, { type Application } from 'express';
import cors from 'cors'
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './db/schema.ts'
import { authRouter } from './routes/auth/authRoutes.ts';
import { apiRouter } from './routes/apiRoutes.ts';
import cookieParser from 'cookie-parser';
import { PORT } from '@my-app/shared';
import { Server } from 'socket.io';
import http from 'http';
import { setupLobbies } from './routes/socketIO/lobbies.ts';

const connectionString = process.env.DATABASE_URL as string;
const client = postgres(connectionString, { prepare: false }); 
export const db = drizzle(client,{schema});



const app:Application = express();
const backendPort = PORT.server||3000
const dbPort = PORT.db
const allowedOrigins = [
  'http://localhost:5173',
  `http://localhost:${backendPort}`, 
  `http://localhost:${dbPort}`
];
const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin:allowedOrigins,
    methods:['GET','POST']
  }
})

app.use(express.json())
app.use(cookieParser())


app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  })
);

app.use('/auth',authRouter)
app.use('/api',apiRouter)

httpServer.listen(backendPort, () => {
  console.log(`Backend server running on http://localhost:${backendPort}`);
});

setupLobbies(io);