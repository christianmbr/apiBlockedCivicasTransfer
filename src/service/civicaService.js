import schedule from 'node-schedule'
import civicaDb from '../db/civicaDb.js'

let version = 29448
let status = 1
const TIME_CLOCK = 10

const job = schedule.scheduleJob(`*/${TIME_CLOCK} * * * * *`, async () =>{
    console.log('Buscando actualizaciones................................... version: ', version)
    const query = `select*from civicas where LRE_VERSAO=${version} and LRE_STATUS=${status}`
    const isUpdated = await searchUpdates(query)
    version += 1
    // if (isUpdated) version = version + 1
})

async function searchUpdates(query) {
    return await civicaDb.searchUpdates(query)
}

async function insertAll2Mongo(){
    return await civicaDb.insertAll2Mongo()
}

async function isFirstTime() {
    return await civicaDb.isFirstTime()
}

export default { insertAll2Mongo, isFirstTime }