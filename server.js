import express  from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path'

import {user_router} from './routes/Users.js';
import { level_router } from './routes/Levels.js';

dotenv.config();

const server = express();
server.use(cors());
server.use(cookieParser());
server.use(express.urlencoded({extended:true}));
server.use(express.json())

server.listen(process.env.PORT, ()=>{
    console.log(`run on port ${process.env.PORT}`);
  })

server.use('/api/users', user_router);
server.use('/api/levels', level_router);
server.use('/uploads', express.static('uploads'));
server.use(express.static(path.resolve(__dirname, "./client/build")));
server.use(express.static(path.join(__dirname, "client/build")));

server.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
