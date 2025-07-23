import { Router } from "express";
import UsersControllers from "../controllers/UsersControllers";
import { createUserSchema } from "../schemas/UserSchemas";
import AuthMiddleware from "../../../shared/middlewares/AuthUserMiddleware";

const usersRoutes = Router();
const usersControllers = new UsersControllers();

usersRoutes.get("/",AuthMiddleware.execute, usersControllers.index);
usersRoutes.post("/", createUserSchema, usersControllers.create);

export default usersRoutes;
