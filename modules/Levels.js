import {db} from '../config/db.js';

export const createLevel = async (level) => {
    return db('levels')
    .insert(level)
    .returning('*')
}

export const updateLevel = async (level) => {
    return db('levels')
    .where({'id' : level.id})
    .update(level)
    .returning('*')
}

export const deleteLevel = async (id) => {
    return db('levels')
    .where({'id' : id})
    .delete()
    .returning('*')
}

export const getLevel = async (id) => {
    return db('levels')
    .select('*')
    .where({'id' : id})
}

export const getAllLevels = async () => {
    return db('levels')
    .select('id')
    .orderBy('id')
}