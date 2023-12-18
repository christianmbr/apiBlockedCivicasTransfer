import mongoose from 'mongoose'
// 
const url = 'mongodb://localhost:27017'

function connect() {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

export default { connect }