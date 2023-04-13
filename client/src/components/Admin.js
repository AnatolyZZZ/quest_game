import { GameMenu } from "./GameMenu"
import { LevelEdit } from "./LevelEdit"
import { useSelector } from "react-redux"

export const Admin = (props) => {
    const isAdmin = useSelector(state => state.isAdmin);
    return isAdmin ? <>
    <p>Admin page</p>
    <GameMenu/>
    <LevelEdit/>
    </> : null
} 