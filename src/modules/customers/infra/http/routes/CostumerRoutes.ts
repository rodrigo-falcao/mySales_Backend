import { Router } from "express";
import AuthMiddleware from "@shared/middlewares/AuthUserMiddleware";
import CustomersControllers from "../controllers/CustomersControllers";
import { idParamsValidation, createCustomerValidation, updateCustomerValidation } from "../schemas/CustomersSchema";

const customersControllers = new CustomersControllers();
const customerRoutes = Router();

customerRoutes.use(AuthMiddleware.execute);
customerRoutes.get("/", customersControllers.index);
customerRoutes.get("/:id", idParamsValidation, customersControllers.show);
customerRoutes.post("/", createCustomerValidation, customersControllers.create);
customerRoutes.patch("/:id", idParamsValidation, updateCustomerValidation, customersControllers.update);
customerRoutes.delete("/:id", idParamsValidation, customersControllers.delete);

export default customerRoutes;
