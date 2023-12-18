import civicaService from '../service/civicaService.js'

async function isFirstTime(){
    const response = await civicaService.isFirstTime()
    return !response ? await civicaService.insertAll2Mongo() : false
}

export default { isFirstTime }