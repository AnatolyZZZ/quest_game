import { AppContext } from "../App";
import { useContext } from "react";
import './DisplayLevel.css'

export const DisplayLevel = (props) => {
    const {level} = useContext(AppContext);
    return <div className="levelDisplay">
           { level.photo &&  <img 
                src={'/uploads/' + level.photo}
                className="levelPicture"
                alt='quest riddle'/>}
            <p className="level-text">{level.description}</p>
         </div>

}