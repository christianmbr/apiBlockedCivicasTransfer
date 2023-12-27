import CivicaModel from '../model/civicaModel.js'
import VersionModel from '../model/civicaVersion.js'
import databaseConection from './databaseConection.js'
import config from '../../config.js'

async function getStartApi(){
    try {
        const response = await VersionModel.findOne({})
        if(!response) {
            const newVersion = new VersionModel({ 
                version: config['versionStartIn']
            })
            await newVersion.save()
            return true
        }
    } catch (err) {
        console.log(err.message)
    }
}

async function searchVersion(){
    try {
        return await VersionModel.find({})
    } catch (err) {
        console.log(err.message)
    }
}

async function updateVersion(id, versionActual){
    try{
        await VersionModel.updateOne({_id: id}, { $set: { version: versionActual+1 } })
    } catch (err) {
        console.log(err.message)
    }
}

async function searchUpdates(version) {
    try {
        const query = `select*from civicas where LRE_VERSAO=${version}`
        const rows = await databaseConection.mariadbSearchQuery(query)
        
        const id = prepareBlockedNUnblockedId(rows)
        
        // Insert.
        if(id['blockedId']){
            await insertBlockedId(id['blockedId'])
        }
        
        // Delete.
        if(id['unblockedId']){
            await unblockId(id['unblockedId'])
        }
    } catch (err) {
        console.log(err.message)
    }
}

function prepareBlockedNUnblockedId(rows){
    const blockedId = []
    const unblockedId = []

    if(rows.length !=0) {
        rows.map(id => {
            if (id['LRE_STATUS'] === 1 || id['LRE_STATUS'] === 3) blockedId.push(id)
            else unblockedId.push(id)
        })
        console.log({ blockedId, unblockedId })
        return { blockedId, unblockedId }
    } else {
        console.log('Nothing to updathe in this version')
        return {}
    }
}

async function insertBlockedId(blockedId){
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
}

async function unblockId(unblockedId) {
    try {
        await CivicaModel.deleteMany({ CAR_ID: { $in: unblockedId.map(id => id.CAR_ID) } })
    }catch(err) {
        console.log(err.message)
    }
}

export default { searchUpdates, searchVersion, updateVersion, getStartApi }