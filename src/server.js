/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import cors from 'cors'
import { corsOptions } from './config/cors'
import { APIs_V1 } from './routes/v1'
import { env } from '~/config/environment'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'


(async () => {
  try {
    console.log('Connecting to MongoDB Cloud Atlas...')
    await CONNECT_DB()
    console.log('Connected to MongoDB Cloud Atlas.')

    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

const START_SERVER = () => {
  const app = express()

  app.use(cors(corsOptions))

  const hostname = env.APP_HOST
  const port = env.APP_PORT

  app.use(express.json())

  app.get('/', async (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.use('/v1', APIs_V1)

  app.use(errorHandlingMiddleware)

  app.listen(port, hostname, () => {
    console.log(`Hello, I am ${env.AUTHOR} running at ${hostname}:${port}`)
  })

  exitHook(() => {
    CLOSE_DB()
  })
}
