import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from './boardRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({ Massage: 'Hello Hoai' })
})

Router.use('/boards', boardRoute)

export const APIs_V1 = Router