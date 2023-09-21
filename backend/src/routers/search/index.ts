import { Router } from "express";
import { attachSession } from "@/shared/middleware";
import { getSuggestions } from "./controllers";

const route = Router();

route.get("/:query/suggestions", getSuggestions);

export { route as searchRouter };
