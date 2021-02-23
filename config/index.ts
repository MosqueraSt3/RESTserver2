import { config } from 'dotenv'

config()

const envIndex = {
    port: process.env.PORT || '8000',
    dbName: process.env.DB_NAME || 'db_restserver',
    dbUser: process.env.DB_USER || 'root',
    dbPassword: process.env.DB_PASSWORD || ''
}

export { envIndex }