export default class CoronaService {

    parameters = {};

    async getAll(coronaModel, query) {
        this.parameters = {};
        let keys = this.createQuery(query, this.parameters, '_id');
        const coronaData = await coronaModel.aggregate([
            {
              $group :
                {
                  _id : "$jour",
                  hosp: { $sum: "$hosp" },
                  rea: {$sum: "$rea"},
                  rad: {$sum: "$rad"},
                  dc: {$sum: "$dc"}
                }
            },
            { $match: keys },
            { $sort : { _id: 1 } }
        ]);
        return coronaData;
    }

    async getBy(coronaModel, depNumber, query) {
        this.parameters = {dep: depNumber};
        let keys = this.createQuery(query, this.parameters, 'jour');
        const coronaData = await coronaModel.find(keys);
        return coronaData;
    }

    async importedDate(importedModel, tableName) {
        return await importedModel.findOne({table_name: tableName}).sort('-created_at');
    }

    createQuery(query, parameters, key) {
        if(Object.keys(query).length !== 0) {
            this.getQuery(query, function(params) {
                parameters[key] = params;
            })
        }
        return parameters;
    }

    getQuery(query, cb) {
        let params = {}
        if(query.startDate && query.startDate !== '') params.$gte = new Date(new Date(query.startDate).setDate(new Date(query.startDate).getDate()-1));
        if(query.endDate && query.endDate !== '') params.$lt = new Date(new Date(query.endDate).setDate(new Date(query.endDate).getDate()+1));
        cb(params);
    }
}