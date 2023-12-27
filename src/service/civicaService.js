import schedule from 'node-schedule'
import civicaDb from '../db/civicaDb.js'
import config from '../../config.js'

const TIME_CLOCK = config['jobCicleTime']

const job = schedule.scheduleJob(`*/${TIME_CLOCK} * * * * *`, async () => {
    try {
        const response = await searchVersion()
        const actualVersion = response[0]['version']
        const idActualVersion = response[0]['_id']
        
        console.log('Searching for updates ................................... version: ', actualVersion)
        
        await searchUpdates(actualVersion)
        await updateVersion(idActualVersion, actualVersion)
    } catch (err) {
        console.log(err.message)
    }
})

async function getStartApi(){
    try {
        if(await civicaDb.getStartApi()){
            console.log('Database is created in Mongo!')
        }
    } catch (err) {
        console.log(err.message)
    }
}

async function searchVersion(){
    try {
        return await civicaDb.searchVersion()
    } catch (err) {
        console.log(err.message)
    }
}

async function updateVersion(id, versionActual){
    try {
        return await civicaDb.updateVersion(id, versionActual)
    } catch (err) {
        console.log(err.message)
    }
}

async function searchUpdates(version) {
    try {
        return await civicaDb.searchUpdates(version)
    } catch (err) {
        console.log(err.message)
    }
}

export default { getStartApi }