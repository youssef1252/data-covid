import Router from 'express';
import departementRoutes from './departements.js';
import coronaRoutes from './corona.js';

const routes = Router();
routes.use('/departements', departementRoutes);
routes.use('/corona', coronaRoutes);

export default routes;