import mariadb from 'mariadb'
import CivicaModel from '../model/civicaModel.js'
import VersionModel from '../model/civicaVersion.js'

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234567',
    database: 'civicas'
})

async function searchVersion(){
    return await VersionModel.find({})
}

async function updateVersion(id, versionActual){
    await VersionModel.updateOne({_id: id}, { $set: { version: versionActual+1 } })
}

async function searchUpdates(version) {
    let conn
    let rows
    // const query = `select*from civicas where LRE_VERSAO=${version} and LRE_STATUS=1`
    try {
        const query = `select*from civicas where LRE_VERSAO=${version}`
        conn = await pool.getConnection()
        rows = await conn.query(query)
        if (conn) await conn.end()        
    } catch(err) {
        console.log(err.message)
    }

    // console.log(rows)

    // Search for blocked ids.
    const blockedId = []
    const unblockedId = []
    if(rows.length !=0) {
        rows.map(id => {
            if (id['LRE_STATUS'] === 1 || id['LRE_STATUS'] === 3) blockedId.push(id)
            else unblockedId.push(id)
        })
        console.log({ blockedId, unblockedId })
    } else {
        console.log('Nothing to updathe in this version')
    }

    // Insert.
    try {
        blockedId.map(async (document) => {
            await CivicaModel.updateOne(
                { CAR_ID: document.CAR_ID },
                { $set: document },
                { upsert: true }
            )
        })
    } catch(err) {
        console.log(err.message)
    }
    
    // Delete.
    try {
        const deleteId = await CivicaModel.deleteMany({ CAR_ID: { $in: unblockedId.map(id => id.CAR_ID) } })
        // console.log('Se eliminaron:', deleteId['deletedCount'])
    }catch(err) {
        console.log(err.message)
    }
}

export default { searchUpdates, searchVersion, updateVersion }