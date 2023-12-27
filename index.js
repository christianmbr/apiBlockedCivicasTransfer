import express from 'express'
import databaseConection from './src/db/databaseConection.js'
import civicaService from './src/service/civicaService.js'
import config from './config.js'

const expressApp = express()
const PORT = config['apiPort']


try {
    // Connection to DB.
    await databaseConection.connect()
    console.log('🟢 Mongo is running! in port: 27017')
    // Connect start API.
    expressApp.listen(PORT, () => { console.log('🚀 Server is running in port: '+ PORT) })
    await civicaService.getStartApi()
} catch (err) {
    console.error(err)
}

