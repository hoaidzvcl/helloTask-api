import { StatusCodes } from 'http-status-codes'
import { userModel } from '~/models/userModel'
import ApiError from '~/utils/ApiError'
import bcryptjs from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { pickUser } from '~/utils/formatters'

const createNew = async (reqBody) => {
  try {
    // Kiểm tra xem email đã tồn tại trong DB chưa
    const existUser = await userModel.findOneByEmail(reqBody.email)
    if (existUser) {
      throw new ApiError(StatusCodes.CONFLICT, 'Email already exists!')
    }

    // Tạo data lưu vào DB
    const nameFromEmail = reqBody.email.split('@')[0]
    const newUser = {
      email: reqBody.email,
      password: bcryptjs.hashSync(reqBody.password, 8),
      username : nameFromEmail,
      displayName: nameFromEmail,
      verifyToken: uuidv4()
    }

    // Lưu data vào DB
    const createdUser = await userModel.createNew(newUser)

    const getUser = await userModel.findOneById(createdUser.insertedId)

    return pickUser(getUser)
  } catch (error) { throw error }
}

export const userService = {
  createNew
}