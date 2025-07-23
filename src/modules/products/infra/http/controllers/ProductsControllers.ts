import { Request, Response } from "express";
import CreateProductsService from "../../../services/CreateProductsService";
import DeleteProductsService from "../../../services/DeleteProductsService";
import ListProductsService from "../../../services/ListProductsService";
import ShowProductsService from "../../../services/ShowProductService";
import UpdateProductsService from "../../../services/UpdateProductService";



export default class ProductsControllers {
  // Retrieves a list of ALL PRODUCTS
  async index(request: Request, response: Response): Promise<Response> {
    const listProductsService = new ListProductsService();
    const products = await listProductsService.execute();
    return response.json(products);
  }
  // Retrieves a single product by its ID
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showProductsService = new ShowProductsService();
    const product = await showProductsService.execute({ id });
    return response.json(product);
  }
  // Creates a new product with the provided name, price, and quantity
  async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const createProductsService = new CreateProductsService();
    const product = await createProductsService.execute({
      name,
      price,
      quantity,
    });
    return response.json(product);
  }
  // Updates an existing product identified by ID
  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;
    const updateProductsService = new UpdateProductsService();
    const product = await updateProductsService.execute({
      id,
      name,
      price,
      quantity,
    });
    return response.json(product);
  }
  // Deletes a product identified by ID
  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteProductsService = new DeleteProductsService();
    await deleteProductsService.execute({ id });
    return response.json({ message: "Product deleted successfully!" });
  }
}

