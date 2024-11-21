import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ Massage: 'List Boards' })
  })
  .post(boardValidation.createNew, boardController.createNew)

Router.route('/:id')
  .get(boardController.getDetail)
  .put(boardValidation.update, boardController.update)

Router.route('/supports/move_card')
  .put(boardValidation.moveCardToDiffirentColumns, boardController.moveCardToDiffirentColumns)

export const boardRoute = Router
