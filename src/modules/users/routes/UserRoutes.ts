import { Router } from "express";
import UsersControllers from "../controllers/UsersControllers";
import { createUserSchema } from "../schemas/UserSchemas";

const usersRoutes = Router();
const usersControllers = new UsersControllers();

usersRoutes.get("/", usersControllers.index);
usersRoutes.post("/", createUserSchema, usersControllers.create);

export default usersRoutes;
