import express, { Application } from 'express'
import cors from 'cors'

import { envIndex } from '../config'

import db from '../db/connection'
import userRoutes from '../routes/user.routes'

class Server {

    private app: Application
    private port: string
    private apiPaths = {
        user: '/api/user'
    }

    constructor() {
        this.app = express()
        this.port = envIndex.port

        // DB CONNECTION
        this.dbConnection()

        // MIDDLEWARES
        this.middlewares()

        // ROUTER
        this.routes()
    }

    async dbConnection(){
        try {
            await db.authenticate()
            console.log(`||DB||ON||`);
        } catch (err) {
            throw new Error( err )
        }
    }

    middlewares(){
        // CORS
        this.app.use( cors() )

        // BODY PARSER
        this.app.use( express.json() )

        // STATIC
        this.app.use( express.static('public') )
    }

    routes(){
        this.app.use( this.apiPaths.user , userRoutes)
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`||SERVER||ON|| ${this.port}`);
        } )
    }
}

export default Server