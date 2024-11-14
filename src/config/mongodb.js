import { env } from '~/config/environment'

import { MongoClient, ServerApiVersion } from 'mongodb'

// Khởi tạo một đối tượng helloDatabaseInstance, ban đầu là null vì chưa kết nối với cơ sở dữ liệu
let helloDatabaseInstance = null

// Khởi tạo đối tượng mongoClientInstance, đây là đối tượng giúp kết nối tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

export const CONNECT_DB = async () => {
    try {
        await mongoClientInstance.connect()
        helloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
        console.log('Successfully connected to the database')
    } catch (error) {
        console.error('Failed to connect to MongoDB', error)
        throw error
    }
}

export const GET_DB = () => {
    if (!helloDatabaseInstance) throw new Error('Must connect to Database first')
    return helloDatabaseInstance
}

export const CLOSE_DB = async () => {
    await mongoClientInstance.close()
}
