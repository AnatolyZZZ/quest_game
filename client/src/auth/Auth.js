import { useDispatch } from "react-redux";
import { setToken, setAdmin } from "../actions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
// import axios from 'axios';

export const Auth = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);
    useEffect (
        () => {
            const verify = async () => {
            const res = await fetch('api/users/token');
            if (res.ok !== true) {
                navigate('/login')
            } else {
                const data = await res.json()
                const token = data.accessToken;
                const decode = jwt_decode(token);
                // set smth with useState return <Player> / <Admin> 
                console.log(decode)
                dispatch(setToken(token));
                dispatch(setAdmin(decode.isAdmin))
                setRedirect(true)
                if (!decode.isAdmin) {navigate('/game')}
            }
        }
    verify()}, []
    )
    return redirect ? props.children : null

}