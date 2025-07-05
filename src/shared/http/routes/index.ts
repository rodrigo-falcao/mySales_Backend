import { Router } from 'express';
import productsRoutes from '@modules/products/routes/ProductsRoutes';

const routes = Router();

routes.get('/health', (req, res) => {
  return res.json({ message: 'Hello dev, I am alive!' });
});

routes.use('/products', productsRoutes)

export default routes;
