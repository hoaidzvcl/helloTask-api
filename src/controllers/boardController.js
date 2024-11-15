import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    console.log(req.body)
    const createdBoard = await boardService.createNew(req.body)
    res.json({ createdBoard })
  } catch (error) { next(error) }
}

const getDetail = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const board = await boardService.getDetail(boardId)
    res.status(StatusCodes.OK).json({board})
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew,
  getDetail
}
