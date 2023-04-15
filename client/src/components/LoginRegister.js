import { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import {useDispatch} from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { setToken, setAdmin, setUserId, setPlayerLevel } from "../actions";
import {FormControl,FormControlLabel, RadioGroup, Radio, FormLabel, Button, TextField, Box } from '@mui/material';

export const LoginRegister = ({title}) => {
    const [msg, setMsg] = useState('');
    const {setLevelIndex} = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [admin, _setAdmin] = useState('false');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const smthChange = email+password+admin;
    useEffect(()=> {setMsg('')}, [smthChange]);


    const handleAction = async (title) => {
        const para = {
            method : 'POST',
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify(
                {
                    isAdmin : admin === 'true' ? true : false,
                    email : email,
                    password : password
                }
            )
        }
        if (title === "Login") {
            // console.log(para);
            try {
                const res = await fetch('/api/users/login', para);
                const data = await res.json();
                if (res.ok !== true) {
                    setMsg(data.msg)
                } else {
                    // console.log(data);
                    const isAdmin = admin === 'true' ? true : false
                    dispatch(setToken(data.accessToken));
                    dispatch(setAdmin(isAdmin));
                    dispatch(setUserId(data.userid));
                    if (isAdmin) {
                        navigate('/admin');
                    }  else {
                        dispatch(setPlayerLevel(data.cur_level));
                        setLevelIndex(data.cur_level);
                        navigate('/game');
                    }
                }
            } catch (error) {
                console.log(error);
                // setMsg(JSON.stringify(error));
            }
        } else if (title === "Register") {
            try {
                const res = await fetch('/api/users/register', para);
                const data = await res.json();
                dispatch(setToken(data.accessToken));
                setMsg(data.msg);
                navigate('/login');
            } catch (error) {
                console.log(error.msg);
                setMsg(JSON.stringify(error));
            }
        }
    }


    return (<div style={{padding: '2rem'}}>
    <h3>{title}</h3>
    <Box component='form' sx={{m:1, display:'flex', flexDirection : 'column'}} noValidate>
        <TextField sx={{m:1}} id='email' name='email' label='Enter email' variant='outlined' onChange={(e) => setEmail(e.target.value)}/>
        <TextField sx={{m:1}} id='password' name='password' label='Enter password' variant='outlined' onChange={(e) => setPassword(e.target.value)}/>
        <FormControl>
            <FormLabel id="user-type">Your role</FormLabel>
            <RadioGroup
                row
                aria-labelledby="user-typel"
                defaultValue="false"
                name="isAdmin"
            >
                <FormControlLabel value="false" control={<Radio />} label="Player" onChange={(e) => _setAdmin(e.target.value)}/>
                <FormControlLabel value="true" control={<Radio />} label="Admin" 
                onChange={(e) => _setAdmin(e.target.value)}/>
            </RadioGroup>
        </FormControl>
    </Box>

    <Button variant="contained" onClick={()=>handleAction(title)}>{title}</Button>

    <div>
        <p>{msg}</p>
    </div>

    <div>
        {
          title === 'Register'
          ? <Link to='/login'>Login</Link>
          : <Link to='/register'>Register</Link>
        }
    </div>

    </div>)
}