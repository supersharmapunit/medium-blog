import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export function getPrismaClient(databaseURL :string) {
    return new PrismaClient({
        datasourceUrl: databaseURL
    }).$extends(withAccelerate());
};