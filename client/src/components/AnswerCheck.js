import { AppContext } from "../App";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPlayerLevel } from "../actions";
import './AnswerCheck.css'

export const AnswerCheck = (props) => {
    const {level, setLevelIndex} = useContext(AppContext);
    const [msg, setMsg] = useState('');
    const [answer, setAnswer] = useState('');
    const levels = useSelector(state => state.levels);
    const cur_level = useSelector(state => state.level);
    const userid = useSelector(state => state.id);
    const ind = levels.findIndex(elt => elt.id ===
        cur_level);
    const dispatch = useDispatch();
    const levelUp = async () => {
        // console.log('levels =>', levels)
        // console.log('cur_level =>',cur_level);
        // console.log('ind=>', ind);
        const next_level = levels[ind + 1].id;
        const para = {
            method : 'PUT',
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify({
                id : userid,
                new_level : next_level
            })
        }
       const res = await fetch('/api/users/lvl', para);
       if (res.ok === true) {
        dispatch(setPlayerLevel(next_level));
        setLevelIndex(next_level);
        setAnswer('');
        window.scrollTo(0,0);
       }
    }

    const check = (e) => {
        const arr = level.answers.split(',').map(elt => elt.trim());
        const right = arr.filter(elt => elt === answer.trim());
        console.log('arr =>',arr);
        if (right.length === 0) {
            setMsg('Wrong. Try again');
            setTimeout(() => setMsg(''), 5000);
        } else {
            levelUp()
        } 
    }

    return ind !== levels.length - 1 &&
     <div className="levelDisplay">
        {(msg !== '') && <p className="level-text msg">{msg}</p>}
        <p className="level-text answer">Enter your answer:</p>
        <input type='text' onChange={(e) => {
            setAnswer(e.target.value);
            setMsg('');
            }} className="answer-input"/>
        <button onClick={(e) => check()} className="check-button">Check answer</button>
    </div>
    

}