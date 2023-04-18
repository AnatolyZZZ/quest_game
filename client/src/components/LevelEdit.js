import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import './LevelEdit.css';
import { useDispatch } from 'react-redux';
import { getGame} from "../actions";


export const LevelEdit = (props) => {
    const {levelIndex, editmode, setEdit, level, setLevel, setLevelIndex, getLevel} = useContext(AppContext);
    const dispatch = useDispatch();
    const [fileindex, setFileIndex] = useState('123');

    useEffect(() => {getLevel()}, [levelIndex])

    const navigate = useNavigate();
    
    const saveHandler = async (e) => {
        e.preventDefault()
        // same handler for new level and edditing, if levelIndex -1 - POST, else PUT, and if 
        // not in edit mode this button switch to editmode
        if (!editmode) {
            setEdit(true)
        } else {
            const formD = new FormData(e.target);
            // otherwise id attepts to create new level with id -1
            if (levelIndex === -1) {
                formD.delete("id");
            }
            const para = {
                method : levelIndex === -1 ? 'POST' : 'PUT',
                body : formD
            }
        
            // fetch(`/api/levels`, para)
            // .then(res => res.json())
            // .then(data => {
            //         setLevel(data[0]);
            //     })
            // .catch((error) => {
            //     console.error("Error:", error);
            // })
            const res = await fetch(`/api/levels`, para)
            if (res.ok === true) {
                const data = await res.json()
                // console.log('data2 =>', data)
                setLevel({...data[0], file : "", imagedeleted : false});
                setLevelIndex(data[0].id)
                setEdit(false);
                // want to clear file input after submiting
                e.target.file.value = '';
            } else {
                navigate('/login')
            }

        }
    }
    const delHandler = async (e) => {
        const para = {
            method : 'DELETE',
            headers: {"Content-Type" : "application/json"},
            body : JSON.stringify(level)
        }
        if(prompt('Deleting level can crash unfinished games!!! Are you shure?! Type: Yes') === "Yes") {
            fetch(`/api/levels`, para)
            .then(res => res.json())
            .then(data => {
            // We just modyed number of levels -> have to update state.levels and GameMenu component
            // and set levelIndex to -1
                dispatch(getGame())
                setLevelIndex(-1)
                })
            .catch((error) => {
                console.log("Error:", error);
          })
        }
       setLevelIndex(-1); 
    }
    const deleteImage = async (e) => {
        setFileIndex(Date.now());
        setLevel({...level, imagedeleted : true})
    }

    // if we discard changes have to get level from server
    const cancelBtn = editmode ? <button className='discardBtn' onClick={(e) => {
        getLevel();
        setFileIndex(Date.now());
        setEdit(false);
    }}>Discard changes</button> : <></>

    // show button only in edit mode and not for new level
    const delBtn = editmode&&(levelIndex !== -1)? <button className='delBtn' onClick={(e) => {
        delHandler();
        setEdit(false);
    }}>Delete level</button> : <></>

    const editBtn = 
    <button type="submit" className="editBtn">
        {levelIndex === -1 ? 'Create new level' : editmode ? 'Save changes' : 'Edit level'}
    </button> 


    return <div className="leveledit">
    {/* { levelIndex !== -1 && (editmode  ? <p>You are edditing level N {levelIndex}</p> : <p>This is level  {levelIndex}</p>)} */}
    {(level.photo || level.file) && (level.imagedeleted=== false) && <div className="mainpicdiv">
    <img 
        src={level.file === '' ? '/uploads/' + level.photo : level.file}
        className="mainpic"
        alt='Once in a while, render.com deletes all new files from server, probably this happend to the picture'
    />

    {editmode && <button onClick={(e) =>deleteImage()} className="delimage">delete image</button>}
    </div>}
    
    <form  
        method="POST" 
        encType="multipart/form-data"
        onSubmit={saveHandler}
        className="main-form"
        >

        <input type='hidden' value={level.id} name='id'/>
        <input type='hidden' value={level.photo} name='photo'/>
        <input type='hidden' value={level.imagedeleted} name='imagedeleted'/>
        
        {editmode && <div className="form-part">
        <label htmlFor='file'>Upload image</label>
        <input 
            key={fileindex}
            type="file"
            name="file"
            disabled={!editmode}
            placeholder="Add riddle image"
            accept="image/png, image/jpeg"
            onChange={(e) => setLevel({...level, file : URL.createObjectURL(e.target.files[0]), imagedeleted : false})}/>
        </div>}

        <div className="form-part">
            <label htmlFor='description'>Level description</label>
            <textarea name="description"
                onChange={(e) => setLevel({...level, description : e.target.value})} 
                value={level.description}
                disabled={!editmode}
                placeholder="enter riddle text"
                autoComplete='off'
                rows='5'>
                {level.description}
            </textarea>
        </div>
        
        <div className="form-part">
            <label htmlFor='answers'>Answers</label>
            <input 
                type="text" 
                name="answers" 
                placeholder="enter answers separated with coma" 
                onChange={(e) =>setLevel({...level, answers : e.target.value})} 
                value={level.answers} 
                disabled={!editmode}
                autoComplete='off'
                className="answers"
            />
        </div>
        {editBtn}
    </form>

    {cancelBtn}
    {delBtn}
    </div>
}