import { Router } from "express";
import { attachSession } from "@/shared/middleware";
import { getMe } from "./controllers";

const route = Router();

route.get("/me", attachSession(), getMe);

export { route as usersRouter };
