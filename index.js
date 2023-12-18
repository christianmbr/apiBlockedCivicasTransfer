import express from 'express'
import databaseConection from './src/db/databaseConection.js'
// import civicaController from './src/controller/civicaController.js'

const expressApp = express()
// Port should be located in env!
const PORT = 5001

// Connection to DB.
databaseConection.connect()
    .then(db => console.log('🟢 Mongo is running! in port: 27017'))
    .catch(error => console.error(error))

expressApp.listen(PORT, () => { console.log('🚀 Server is running in port: '+ PORT) })

// console.log(await civicaController.isFirstTime())