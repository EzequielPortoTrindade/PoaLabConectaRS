export function buildUsersController(service: any) {
  return {
    async list(req: any, reply: any) {
      return service.getUsers()
    },

    async get(req: any, reply: any) {
      const { id } = req.params
      return service.getUserById(id)
    },

    async create(req: any, reply: any) {
      const user = await service.createUser(req.body)
      return reply.status(201).send(user)
    }
  }
}