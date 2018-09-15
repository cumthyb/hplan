import koa from 'koa'
import Router from 'koa-router'
import cors from 'koa2-cors'
import parser from 'koa-bodyparser'
import dbconnection from './db/dbconnection'
import dbApis from './routes/dbApis'
import uptokenApi from './routes/qiniu_token'

const app = new koa()

const cors_options = {
    // origin: function(ctx) {
    //     if (ctx.url === '/api') {
    //         return false;
    //     }
    //     return '*';
    // },

    // origin: function(ctx) {
    //     return 'http://127.0.0.1:3000'
    // },

    // credentials: true,
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'Access-Control-Allow-Origin'
    ]
}

app.use(cors(cors_options))
    .use(parser())
    .use(dbApis(Router))
    .use(uptokenApi(Router))
;(async () => {
    try {
        await dbconnection()
    } catch (error) {
        console.error(error)
        return
    }
    app.listen(3011)
    console.log('====================================')
    console.log('dbServer start service at 127.0.0.1:3011')
    console.log('====================================')
})()
