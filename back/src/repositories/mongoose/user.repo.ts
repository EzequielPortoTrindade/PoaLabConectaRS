import { UserModel } from "../../db/mongo/model.js"
import type {
  UsersRepository,
  CreateUserData,
} from "../interfaces/user.repo.js"

export class MongoUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    return UserModel.findOne({ email })
  }

  async create(data: CreateUserData) {
    return UserModel.create(data)
  }
}