/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { env } from '~/config/environment'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'


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

  const hostname = env.APP_HOST
  const port = env.APP_PORT

  app.get('/', async (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(port, hostname, () => {
    console.log(`Hello, I ${env.AUTHOR} am running at ${hostname}:${port}`)
  })

  exitHook(() => {
    CLOSE_DB()
  })
}


