import { GameMenu } from "./GameMenu"
import { LevelEdit } from "./LevelEdit"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Header } from "./Header"

export const Admin = (props) => {
    const isAdmin = useSelector(state => state.isAdmin);
    return isAdmin ? <>
    <Header/>
    <GameMenu/>
    <LevelEdit/>
    </> : null
} 