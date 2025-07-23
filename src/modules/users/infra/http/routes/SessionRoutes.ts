import { Router } from "express";
import { sessionSchema } from "../schemas/SessionSchema";
import SessionControllers from "../controllers/SessionsControllers";


const sessionRoutes = Router();
const sessionController = new SessionControllers();

sessionRoutes.post("/", sessionSchema, sessionController.create);

export default sessionRoutes;

