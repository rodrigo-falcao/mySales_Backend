import { Router } from 'express';
import productsRoutes from '@modules/products/routes/ProductsRoutes';
import usersRoutes from '@modules/users/routes/UserRoutes';
import sessionRoutes from '@modules/users/routes/SessionRoutes';

const routes = Router();

routes.get('/health', (req, res) => {
  return res.json({ message: 'Hello dev, I am alive!' });
});

routes.use('/products', productsRoutes)
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionRoutes);

export default routes;
