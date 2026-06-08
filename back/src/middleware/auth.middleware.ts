// import { FastifyReply, FastifyRequest } from "fastify";

// export async function authMiddleware(
//     req: FastifyRequest,
//     reply: FastifyReply
// ) {
//     try {

//         await req.jwtVerify();

//     } catch (error) {

//         return reply.status(401).send({
//             message: "Unauthorized"
//         });
//     }
// }


export function authMiddleware(req, reply) {
    const apiEmail = req.headers['email'];
    if(!apiEmail) {
        reply.status(404).send({
            message: "Email is requaired",
        });
    }
}