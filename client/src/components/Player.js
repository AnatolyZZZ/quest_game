import { DisplayLevel } from "./DisplayLevel"
import { AnswerCheck } from "./AnswerCheck";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../App";
import { Link } from "react-router-dom";

export const Player = (props) => {
    const {levelIndex, setLevelIndex, getLevel} = useContext(AppContext);
    const playerLevel = useSelector(state => state.level);
       
    useEffect(()=>{
        setLevelIndex(playerLevel)}, [playerLevel]);
    useEffect(()=>{
        getLevel()},[levelIndex]);
    return <>
        <DisplayLevel/>
        <AnswerCheck/>
        <Link to="/login">Relogin</Link>
    </>
   
} 