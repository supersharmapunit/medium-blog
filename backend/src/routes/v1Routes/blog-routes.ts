import { Hono } from "hono";
import { verify } from "hono/jwt";

const blogRoute = new Hono<{
    Bindings: {
        JWT_SECRET: string
    }
}>();

blogRoute.use("", async (c, next) => {
    const headerAuthString = c.req.header("Authorization");
    const token = headerAuthString?.split(" ")[1];
    const response = await verify(token || "", c.env.JWT_SECRET);
    if (response.id) {
        next();
    } else {
        c.status(403);
        return c.json({
            error: "unauthorized"
        });
    }
});

blogRoute.post("", (c) => {
    return c.text("post blog");
});

blogRoute.put("", (c) => {
    return c.text("put blog");
});

blogRoute.get("/:id", (c) => {
    return c.text("get blog by id");
});

export default blogRoute;