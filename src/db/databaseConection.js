import mongoose from 'mongoose'
import mariadb from 'mariadb'
import config from '../../config.js'

// 
const url = config['mongoURL']
const pool = mariadb.createPool(config['mariaDBCredentials'])

function connect() {
    return mongoose.connect(url, config['mongoConnectOptions'])
}

async function mariadbSearchQuery(query) {
    let conn
    let rows

    try {
        conn = await pool.getConnection()
        rows = await conn.query(query)
        if (conn) await conn.end()    
        
        return rows
    } catch(err) {
        console.log(err.message)
    }
}

export default { connect, mariadbSearchQuery }
