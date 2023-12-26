import schedule from 'node-schedule'
import civicaDb from '../db/civicaDb.js'

// let version = 1
const TIME_CLOCK = 10

const job = schedule.scheduleJob(`*/${TIME_CLOCK} * * * * *`, async () =>{
    const versionActual = await searchVersion()
    console.log('Buscando actualizaciones................................... version: ', versionActual[0]['version'])
    
    await searchUpdates(versionActual[0]['version'])

    await updateVersion(versionActual[0]['_id'], versionActual[0]['version'])
})

async function searchVersion(){
    return await civicaDb.searchVersion()
}

async function updateVersion(id, versionActual){
    return await civicaDb.updateVersion(id, versionActual)
}

async function searchUpdates(version) {
    return await civicaDb.searchUpdates(version)
}
