import Router from 'express';
import CoronaService from '../services/corona/CoronaService.js';

const coronaRoutes = Router();
const coronaService = new CoronaService();

coronaRoutes.get('/france', async (req, res) => {
    const query = getQuery(req);
    const coronaModel = req.db.Corona.default;
    const coronaData = await coronaService.getAll(coronaModel, query);
    return res.status(200).json(coronaData);
});

coronaRoutes.get('/france/:departement', async (req, res) => {
    const query = getQuery(req);
    const coronaModel = req.db.Corona.default;
    const numberDep = req.params['departement'];
    const coronaData = await coronaService.getBy(coronaModel, numberDep, query);
    return res.status(200).json(coronaData);
});

coronaRoutes.get('/importDate', async (req, res) => {
    const coronaModel = req.db.Imported.default;
    const importedDate = await coronaService.importedDate(coronaModel, 'corona')
    return res.status(200).json(importedDate);
});

function getQuery(request) {
    return request.query;
} 

export default coronaRoutes;