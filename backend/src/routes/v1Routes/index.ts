import { PrismaClient } from '@prisma/client/edge';
import { Hono } from "hono";
import { sign } from "hono/jwt";
import {getPrismaClient} from "../../config/db-config";
import blogRoute from './blog-routes';

const v1Routes = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

v1Routes.post("/signup", async (c) => {
    const prismaClient = getPrismaClient(c.env.DATABASE_URL);
    const body = await c.req.json();
    const user = await prismaClient.user.create({
        data: {
            email: body.email,
            password: body.password
        }
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    c.status(201);
    return c.json({
        jwt: token
    });
});

v1Routes.post("/signin", async (c) => {
    const prismaClient = getPrismaClient(c.env.DATABASE_URL);
    const body = await c.req.json();
    const user = await prismaClient.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    });
    if(!user) {
        c.status(401);
        return c.json({
            "error": "user not found"
        });
    }
    const token = await sign({ id : user.id}, c.env.JWT_SECRET);
    c.status(200);
    return c.json({
        jwt : token
    });
});

v1Routes.route("/blog", blogRoute);

export default v1Routes;