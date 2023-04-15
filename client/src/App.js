import './App.css';
import {useSelector, useDispatch} from "react-redux";
import { useState, createContext, useEffect } from 'react';
import {Admin} from "./components/Admin";
import { Auth } from './auth/Auth';
import {Player} from "./components/Player";
import { getGame } from './actions';
import { setToken, setAdmin, setUserId, setPlayerLevel } from "./actions";
import { Link, Route, Routes } from 'react-router-dom';
import {LoginRegister} from '../src/components/LoginRegister';

export const AppContext = createContext(null);
export const nullLevel = {
    photo : "",
    answers : "",
    description : "",
    imagedeleted : false,
    file : "",
    id : -1
}

function App() {
  const isAdmin = useSelector(state => state.isAdmin);
  const [levelIndex, setLevelIndex] = useState(-1);
  const [editmode, setEdit] = useState(false);
  const [level, setLevel] = useState(nullLevel);
  const dispatch = useDispatch();

  const getLevel = async () => {
    if (levelIndex !== -1) {
        fetch(`api/levels/${levelIndex}`)
        .then(res => 
          res.json()
          )
        .then(data => {
         setLevel({...data[0], imagedeleted : false, file : ""});
        })
        .catch((error) => {
            console.error("Error:", error);
          })
    } else {
        setLevel({...nullLevel})
    }
    // console.log(level.photo)  
}

  useEffect (() => {
    dispatch(setToken(localStorage.getItem("accessToken")));
    dispatch(setAdmin(JSON.parse(localStorage.getItem("isAdmin"))));
    dispatch(setUserId(JSON.parse(localStorage.getItem("userId"))));
    dispatch(setPlayerLevel(JSON.parse(localStorage.getItem("playerLevel"))));
    dispatch(getGame());
  }, [level])

  return (
    <AppContext.Provider value={{levelIndex, setLevelIndex, editmode, setEdit, level, setLevel, getLevel}}>
      {/* <Link to="/login">Login</Link> */}
      {/* <Link to="/register">Register</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/game">Player</Link> */}

      <Routes>
        <Route path='/' element={<LoginRegister title='Login'/>}/>
        <Route path='/login' element={<LoginRegister title='Login'/>}/>
        <Route path='/register' element={<LoginRegister title='Register'/>} />
        <Route path='/admin' element={<Auth><Admin/></Auth>} />
        <Route path='/game' element={<Auth><Player/></Auth>} />
      </Routes>

    </AppContext.Provider>
      
  );
}

export default App;
