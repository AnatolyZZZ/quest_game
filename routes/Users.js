import  {_newUser, _changeLevel, login, getToken, logout} from '../controllers/Users.js'
import express from 'express'
import { VerifyToken } from '../middlwares/VerifyToken.js';

export const user_router = express.Router();

user_router.post('/register', _newUser);
user_router.put('/lvl', VerifyToken, _changeLevel);
user_router.post('/login', login);
user_router.get('/token', VerifyToken, getToken)
user_router.get('/logout', logout);

