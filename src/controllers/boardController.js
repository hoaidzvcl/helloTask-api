import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {
    console.log(req.body)
    const createdBoard = await boardService.createNew(req.body)
    res.json({ createdBoard })
  } catch (error) { next(error) }
}

export const boardController = {
  createNew
}
