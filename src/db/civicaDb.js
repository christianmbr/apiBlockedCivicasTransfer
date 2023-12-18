import mariadb from 'mariadb'
import CivicaModel from '../model/civicaModel.js'

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234567',
    database: 'civicas'
})

async function insertAll2Mongo(){
    let conn;

    try {
        conn = await pool.getConnection()
        const rows = await conn.query('select * from civicas')

        await CivicaModel.insertMany(rows)
        console.log('Mongo was populated!')

        return true
    } catch (err) {
        console.error(err.message)
        return false
    }
}

async function searchUpdates(query) {
    let conn

    try {
        conn = await pool.getConnection()
        const rows = await conn.query(query)
        
        if(rows.length !=0) {
            console.log('updating mongod')
            console.log(rows, '\n')

            // Updating in mongod.
            await CivicaModel.insertMany(rows)
            return true
        } else {
            console.log('Nothing to update')
            return false
        }
    } catch (err) {
        console.error(err.message)
        return false
    }
}

async function updateToMongo(rows){
    await CivicaModel.insertMany(row)
    return null
}

async function isFirstTime() {
    const response = await CivicaModel.findOne({})
    return response ? true : false
}

export default { insertAll2Mongo, isFirstTime, searchUpdates }