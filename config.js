import dotenv from 'dotenv'

dotenv.config()

export default {
    apiPort: process.env.API_PORT,
    jobCicleTime: 10,
    versionStartIn: 1,
    mongoURL: process.env.MONGO_URL,
    mariaDBCredentials: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    },
    mongoConnectOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}