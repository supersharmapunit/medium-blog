import { Hono } from "hono";
import { verify } from "hono/jwt";
import { ResponseDTO } from "../../dto";
import { getPrismaClient } from "../../config/db-config";
import { createBlogInput, updateBlogInput } from "@supersharmapunit/medium-common";

const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string
    }
}>();

blogRoute.use("*", async (c, next) => {
    const headerAuthString = c.req.header("Authorization") || "";
    const token = headerAuthString.split(" ")[1];
    if (!token) {
        c.status(400);
        return c.json(new ResponseDTO("unauthorized", false, "token not found", null));
    }

    try {
        const response = await verify(token, c.env.JWT_SECRET);
        c.set("userId", response.id);
        await next();

    } catch (error) {
        console.log(error);
        c.status(403);
        return c.json(new ResponseDTO("bad request", false, "invalid token", null));
    }
});

blogRoute.post("", async (c) => {
    const prismaClient = getPrismaClient(c.env.DATABASE_URL);
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json(new ResponseDTO("request validation failed", false, "invalid inputs", null));
    }
    try {
        const blog = await prismaClient.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: c.get("userId")
            }
        });
        c.status(201);
        return c.json(new ResponseDTO(null, true, "blog created successfully", blog));
    } catch (error) {
        console.log(error);
        c.status(411);
        return c.json(new ResponseDTO(error, false, "blog creation failed", null));
    }
});

blogRoute.put("", async (c) => {
    const prismaClient = getPrismaClient(c.env.DATABASE_URL);
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json(new ResponseDTO("request validation failed", false, "invalid inputs", null));
    }
    try {
        const blog = await prismaClient.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })

        return c.json(new ResponseDTO(null, true, "blog updated successfully", blog));
    } catch (error) {
        console.log(error);
        c.status(411);
        return c.json(new ResponseDTO(error, false, "blog update failed", null));
    }
});
// todo: add pagination
blogRoute.get("/bulk", async (c) => {
    const prismaClient = getPrismaClient(c.env.DATABASE_URL);
    try {
        const blogs = await prismaClient.post.findMany();
        return c.json(new ResponseDTO(null, true, "blogs fetched successfully", blogs));
    } catch (error) {
        console.log(error);
        c.status(411);
        return c.json(new ResponseDTO(error, false, "blogs fetch failed", null));
    }
});

blogRoute.get("/:id", async (c) => {
    const prismaClient = getPrismaClient(c.env.DATABASE_URL);
    const id = c.req.param("id");

    try {
        const blog = await prismaClient.post.findUnique({
            where: {
                id: id
            }
        });
        if (!blog) {
            c.status(404);
            return c.json(new ResponseDTO("not found", false, `blog not found with id: ${id}`, null));
        }
        return c.json(new ResponseDTO(null, true, "blog fetched successfully", blog));
    } catch (error) {
        console.log(error);
        c.status(411);
        return c.json(new ResponseDTO(error, false, "blog fetch failed", null));
    }
});

export default blogRoute;