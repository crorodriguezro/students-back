import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'

import {Mockgoose} from 'mockgoose'

let mockgoose = new Mockgoose(mongoose)

mockgoose.prepareStorage().then(() => {
  mongoose.connect('mongodb://foobar/baz')
  mongoose.connection.on('connected', () => {
    console.log('db connection is now open')
  })
})

const app = express(apiRoot, api)
const server = http.createServer(app)

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
