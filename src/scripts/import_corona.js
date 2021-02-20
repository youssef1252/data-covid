// $ npm run import_corona
import fs from 'fs';
import csvParser from 'csv-parser';
import mongoose from 'mongoose';
import config from '../config.js';
import Corona from '../db/schemas/corona.js'
import Imported from '../db/schemas/imported.js'

const url = config.mongo_url;
let db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    console.log("###################################");
    console.log("connection to database");
    db.dropCollection("coronas", function (err, result) {
        if (err) {
            console.log("###################################");
            console.log("collection 'coronas' does not exist!!!!!!!!");
            console.log("###################################");
        } else {
            console.log("###################################");
            console.log("collection 'coronas' deleted succefully");
            console.log("###################################");
        }
    });
});
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

/**
 * Import data corona
 */
try {
    let result = [];
    fs.createReadStream('src/public/corona-data/covid19.csv')
            .pipe(csvParser({separator: ";"}))
            .on('data', (row) => {
                const [day, month, year] = (row.jour).split("/");
                result.push({
                    dep: row.dep,
                    jour: `${year}-${month}-${day}`,
                    hosp: row.hosp,
                    rea: row.rea,
                    rad: row.rad,
                    dc: row.dc
                });
            })
            .on('end', () => {
                let tab = groupBy(result);
                Corona.insertMany(tab, (error, d) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(d.length, "items imported");
                        console.log("###################################");
                        console.log('CSV file successfully processed');
                        console.log("###################################");
                        process.exit();
                    }
                });
                Imported({table_name: 'corona'}).save();
            });
} catch (error) {
    console.log('error => ', error);
    process.exit(1);
}

function groupBy(result) {
    let tab = [];
    result.forEach((value, index) => {
        if (index === 0) {
            tab.push(value)
        } else {
            getData(tab, value)
        }
    })
    return tab;
}

function getData(tab, value) {
    let previewElem = tab[tab.length - 1];
    if ((value.jour === previewElem.jour) && (value.dep === previewElem.dep)) {
        previewElem.hosp = parseInt(value.hosp) + parseInt(previewElem.hosp);
        previewElem.rea = parseInt(value.rea) + parseInt(previewElem.rea);
        previewElem.rad = parseInt(value.rad) + parseInt(previewElem.rad);
        previewElem.dc = parseInt(value.dc) + parseInt(previewElem.dc);
    } else {
        tab.push({
            dep: value.dep,
            jour: value.jour,
            hosp: value.hosp,
            rea: value.rea,
            rad: value.rad,
            dc: value.dc
        });
    }
}