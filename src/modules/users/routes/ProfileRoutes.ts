import { Router } from "express";
import { UpdateUserSchema } from "../schemas/UpdateUserSchema";
import AuthMiddleware from "@shared/middlewares/AuthUserMiddleware";
import ProfileControllers from "../controllers/ProfileControllers";

const profileRoutes = Router();
const profileControllers = new ProfileControllers();


profileRoutes.use(AuthMiddleware.execute)
profileRoutes.get("/", profileControllers.show);
profileRoutes.patch("/", UpdateUserSchema, profileControllers.update);


export default profileRoutes;
