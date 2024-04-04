import { Hono } from "hono";

import blogRoute from './blog-routes';
import userRoutes from './user-routes';

const v1Routes = new Hono();

v1Routes.route("/user", userRoutes);
v1Routes.route("/blog", blogRoute);

export default v1Routes;