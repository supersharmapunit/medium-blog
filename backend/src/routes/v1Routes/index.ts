import { Hono } from "hono";

const v1Routes = new Hono();

v1Routes.post("/signup", (c) => {
    return c.text("post signup");
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