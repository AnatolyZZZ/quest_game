import { GameMenu } from "./GameMenu"
import { LevelEdit } from "./LevelEdit"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export const Admin = (props) => {
    const isAdmin = useSelector(state => state.isAdmin);
    return isAdmin ? <>
    <p>Admin page</p>
    <GameMenu/>
    <LevelEdit/>
    <Link to="/login">Relogin</Link>
    </> : null
} 