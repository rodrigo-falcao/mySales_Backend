import { createOrderValidate, idParamsValidate } from '../schemas/OrderSchemas';
import { Router } from 'express';
import AuthMiddleware from '@shared/middlewares/AuthUserMiddleware';
import ShowOrderController from '../controllers/OrdersControllers';

const ordersRoutes = Router();
const OrdersControllers = new ShowOrderController();

ordersRoutes.use(AuthMiddleware.execute)

ordersRoutes.get('/:id', idParamsValidate, OrdersControllers.show);
ordersRoutes.post('/', createOrderValidate, OrdersControllers.create);

export default ordersRoutes;
