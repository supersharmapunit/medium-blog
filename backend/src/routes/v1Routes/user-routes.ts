import { Hono } from "hono";

import { sign } from "hono/jwt";
import { getPrismaClient } from "../../config/db-config";
import { ResponseDTO } from "../../dto/index";
import { signInInput, signUpInput } from "@supersharmapunit/medium-common";

const userRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

userRoutes.post("/signup", async (c) => {
    const prismaClient = getPrismaClient(c.env.DATABASE_URL);
    const body = await c.req.json();
    const { success } = signUpInput.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json(new ResponseDTO("request validation failed", false, "invalid inputs", null));
    }
    try {
        const user = await prismaClient.user.create({
            data: {
                email: body.email,
                password: body.password
            }
        });
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        c.status(201);
        return c.json(new ResponseDTO(null, true, "user created successfully", {
            jwt: token
        }));
    } catch (error) {
        console.log(error);
        c.status(411);
        return c.json(new ResponseDTO(error, false, "user creation failed", null));
    }
});

userRoutes.post("/signin", async (c) => {
    const prismaClient = getPrismaClient(c.env.DATABASE_URL);
    const body = await c.req.json();
    const { success } = signInInput.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json(new ResponseDTO("request validation failed", false, "invalid inputs", null));
    }
    try {
        const user = await prismaClient.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        });
        if (!user) {
            c.status(403);
            return c.json(new ResponseDTO("unauthorized", false, "user not found", null));
        }
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        c.status(200);
        return c.json(new ResponseDTO(null, true, "user signed in successfully", {
            jwt: token
        }));
    } catch (error) {
        console.log(error);
        c.status(411);
        return c.json(new ResponseDTO(error, false, "user sign in failed", null));
    }
});

export default userRoutes;