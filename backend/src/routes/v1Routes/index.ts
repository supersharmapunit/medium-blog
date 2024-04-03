import { Hono } from "hono";
import { sign } from "hono/jwt";
import {getPrismaClient} from "../../config/db-config";

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
    const token = await sign({ email: user.email }, c.env.JWT_SECRET);
    return c.json({
        jwt: token
    });
});

v1Routes.post("/signin", (c) => {
    return c.text("post signin");
});

v1Routes.post("/blog", (c) => {
    return c.text("post blog");
});

v1Routes.put("/blog", (c) => {
    return c.text("put blog");
});

v1Routes.get("/blog/:id", (c) => {
    return c.text("get blog by id");
});

export default v1Routes;