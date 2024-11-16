import { columnService } from '~/services/columnService'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    console.log(req.body)
    const createdColumn = await columnService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdColumn)
  } catch (error) { next(error) }
}

export const columnController = {
  createNew
}
