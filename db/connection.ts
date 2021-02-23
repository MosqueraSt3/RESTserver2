import { Sequelize } from 'sequelize'

import { envIndex } from '../config'

const db = new Sequelize(envIndex.dbName,envIndex.dbUser,envIndex.dbPassword,{
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
})

export default db