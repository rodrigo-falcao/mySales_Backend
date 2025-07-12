import { Router } from 'express';
import productsRoutes from '@modules/products/routes/ProductsRoutes';
import usersRoutes from '@modules/users/routes/UserRoutes';
import sessionRoutes from '@modules/users/routes/SessionRoutes';
import passwordRoutes from '@modules/users/routes/PasswordRoutes';
import profileRoutes from '@modules/users/routes/ProfileRoutes';
import customersRoutes from '@modules/customers/routes/CostumerRoutes';

const routes = Router();

routes.get('/health', (req, res) => {
  return res.json({ message: 'Hello dev, I am alive!' });
});

routes.use('/products', productsRoutes)
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionRoutes);
routes.use('/passwords', passwordRoutes);
routes.use('/profiles', profileRoutes);
routes.use('/customers', customersRoutes);


export default routes;
