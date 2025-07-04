import { Router } from 'express';

const routes = Router();

routes.get('/health', (req, res) => {
  return res.json({ message: 'Hello dev, I am alive!' });
});

export default routes;
