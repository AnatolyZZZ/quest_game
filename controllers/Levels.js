import {createLevel, updateLevel, deleteLevel, getLevel, getAllLevels} from '../modules/Levels.js'
import fs from 'fs'

export const _createLevel = async (req, res) => {
    try {
        const level = await createLevel({...req.body, photo : req.file ? req.file.filename : ""})
        res.status(200).json(level)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : "Creating level failed"})
    }  
}

export const _getLevel = async (req, res) => {
    try {
        const level = await getLevel(req.params.id)
        // console.log(typeof(level[0].photos));
        // console.log(level[0].photos);
        res.status(200).json(level)
    } catch (error) {
        console.log('error from get level =>',error, 'req par =>', req.params.id);
        res.status(500).json({msg : "Level doesn't exist"})
    }  
}
export const _delLevel = async (req, res) => {
    try {
        const level = await deleteLevel(req.body.id);
        if (req.body.photo) {
            fs.unlink(`./uploads/${req.body.photo}`, function (err) {
                if (err) {console.log("couldn't delete");}
            });
        }

        res.status(200).json({msg : "Deleted successfuly"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : "Level doesn't exist"})
    }  
}

export const _updateLevel = async (req, res) => {
    try {
        // console.log('req.body=>',req.body);
        // console.log('req.body.photo=>',req.body.photo);
        // console.log('req.body imagedeleted =>',req.body.imagedeleted);
        // if file is send have to delete previous
        let level;
        if (req.file) {
            if (req.body.photo) {
                fs.unlink(`./uploads/${req.body.photo}`, function (err) {
                    if (err) {console.log("couldn't delete");}
                });
            }
             level = await updateLevel({...req.body, photo : req.file.filename})
        } else {
            // if manualy deleted photo in frontend have to delete previous photo
            if (req.body.imagedeleted === "true") {

                fs.unlink(`./uploads/${req.body.photo}`, function (err) {
                    if (err) {console.log("couldn't delete");};
                }); 
                 level = await updateLevel({...req.body, photo : ""})
            } else {
                 level = await updateLevel(req.body)
            }
        }
    
        res.status(200).json(level)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : "Updating level failed"})
    }  
}

export const _getAllLevels = async (req, res) => {
    try {
        const allLevels = await getAllLevels();
        res.status(200).json(allLevels)
    } catch {
        res.status(500).json({msg : "Geting levels failed"})
    }
    
}