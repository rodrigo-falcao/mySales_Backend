import { Router } from "express";
import ProductsControllers from "../infra/http/controllers/ProductsControllers";
import { createProductSchema, idParamsValidation, updateProductSchema } from "../schemas/ProductsSchemas";

const productsRoutes = Router();
const productsControllers = new ProductsControllers();

productsRoutes.get("/", productsControllers.index);
productsRoutes.get("/:id", idParamsValidation, productsControllers.show);
productsRoutes.post("/", createProductSchema, productsControllers.create);
productsRoutes.put("/:id", updateProductSchema, productsControllers.update);
productsRoutes.delete("/:id", idParamsValidation, productsControllers.delete);

export default productsRoutes;
