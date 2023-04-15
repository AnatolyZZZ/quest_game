import { AppContext } from "../App";
import { useContext } from "react";
import { useSelector } from "react-redux";
import './DisplayLevel.css'

export const DisplayLevel = (props) => {
    const levels = useSelector (state => state.levels);
    const {level, levelIndex} = useContext(AppContext);
    const ind = levels.findIndex(elt =>  elt.id === level.id);
    
    return <div className="levelDisplay">
        <h1 className="level-header">Level {ind + 1}</h1>
           { level.photo &&  <img 
                src={'/uploads/' + level.photo}
                className="levelPicture"
                alt='quest riddle'/>}
            <p className="level-text">{level.description}</p>
         </div>

}