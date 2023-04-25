import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-regular-svg-icons'
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export const Header = (props) => {
    const navigate = useNavigate();
    const logout = async () => {
        const res = await fetch('/api/users/logout');
        if (res.ok) {
            navigate('/login');
        }
    }


    return <>
    <header className='header'>
        <label className="menu-button">
            <FontAwesomeIcon icon={faUser} />
            <input type="checkbox"/>
        </label>
        
    </header>
    <div className='logout'>
        <div onClick={() => logout()}>
            <FontAwesomeIcon icon={faRightFromBracket}/>Logout
        </div>
    </div>
    </>
}