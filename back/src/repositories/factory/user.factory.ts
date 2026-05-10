import { PrismaUsersRepository }
  from "../prisma/user.repo.js"

import { MongooseUsersRepository }
  from "../mongoose/user.repo.js"

export function makeUsersRepository() {
  if (process.env.DATABASE === "mongo") {
    return new MongooseUsersRepository()
  }

  return new PrismaUsersRepository()
}