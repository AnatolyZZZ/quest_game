import { useContext } from "react"
import { useSelector } from "react-redux";
import { AppContext } from "../App"
import './GameMenu.css'

export const GameMenu = (props) => {
    const levels = useSelector (state => state.levels);
    const {setLevelIndex, setEdit, levelIndex} = useContext(AppContext)
    
    return <div className="menu">
            {levels.map((elt, index) => {return <div onClick={(e) => {setLevelIndex(elt.id); setEdit(false)}} className={`levelBtn ${elt.id == levelIndex ? 'selected' : ""}`} key={elt.id}>Level {index + 1}</div>})}
            
            <div className={`levelBtn ${-1 === levelIndex ? 'selected': ""}`} onClick={(e) => {setEdit(true); setLevelIndex(-1)}}>Create new level</div>
         </div>
    
}