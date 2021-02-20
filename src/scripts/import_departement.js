// $ npm run import_dep
import mongoose from 'mongoose';
import config from '../config.js';
import Departement from '../db/schemas/Departement.js'

const url = config.mongo_url;
let db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    console.log("###################################");
    console.log("connection to database");
    db.dropCollection("departements", function (err, result) {
        if (err) {
            console.log("###################################");
            console.log("collection 'departements' does not exist!!!!!!!!");
            console.log("###################################");
        } else {
            console.log("###################################");
            console.log("collection 'departements' deleted succefully");
            console.log("###################################");
        }
    });
});
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });


/**
 * Import data département
 */
try {
    let departements = [
        {numero: '01', name: 'Ain - Bourg-en-bresse'},
        {numero: '02', name: 'Aisne - Laon'},
        {numero: '03', name: 'Allier - Moulins'},
        {numero: '04', name: 'Alpes-de-Haute-Provence - Digne-les-bains'},
        {numero: '05', name: 'Hautes-alpes - Gap'},
        {numero: '06', name: 'Alpes-maritimes - Nice'},
        {numero: '07', name: 'Ardèche - Privas'},
        {numero: '08', name: 'Ardennes - Charleville-mézières'},
        {numero: '09', name: 'Ariège - Foix'},
        {numero: '10', name: 'Aube - Troyes'},
        {numero: '11', name: 'Aude - Carcassonne'},
        {numero: '12', name: 'Aveyron - Rodez'},
        {numero: '13', name: 'Bouches-du-Rhône - Marseille'},
        {numero: '14', name: 'Calvados - Caen'},
        {numero: '15', name: 'Cantal - Aurillac'},
        {numero: '16', name: 'Charente - Angoulême'},
        {numero: '17', name: 'Charente-maritime - La rochelle'},
        {numero: '18', name: 'Cher - Bourges'},
        {numero: '19', name: 'Corrèze - Tulle'},
        {numero: '2A', name: 'Corse-du-sud - Ajaccio'},
        {numero: '2B', name: 'Haute-Corse - Bastia'},
        {numero: '21', name: "Côte-d'Or - Dijon"},
        {numero: '22', name: "Côtes-d'Armor - Saint-brieuc"},
        {numero: '23', name: 'Creuse - Guéret'},
        {numero: '24', name: 'Dordogne - Périgueux'},
        {numero: '25', name: 'Doubs - Besançon'},
        {numero: '26', name: 'Drôme - Valence'},
        {numero: '27', name: 'Eure - Évreux'},
        {numero: '28', name: 'Eure-et-loir - Chartres'},
        {numero: '29', name: 'Finistère - Quimper'},
        {numero: '30', name: 'Gard - Nîmes'},
        {numero: '31', name: 'Haute-garonne - Toulouse'},
        {numero: '32', name: 'Gers - Auch'},
        {numero: '33', name: 'Gironde - Bordeaux'},
        {numero: '34', name: 'Hérault - Montpellier'},
        {numero: '35', name: 'Ille-et-vilaine - Rennes'},
        {numero: '36', name: 'Indre - Châteauroux'},
        {numero: '37', name: 'Indre-et-loire - Tours'},
        {numero: '38', name: 'Isère - Grenoble'},
        {numero: '39', name: 'Jura - Lons-le-saunier'},
        {numero: '40', name: 'Landes - Mont-de-marsan'},
        {numero: '41', name: 'Loir-et-cher - Blois'},
        {numero: '42', name: 'Loire - Saint-étienne'},
        {numero: '43', name: 'Haute-loire - Le puy-en-velay'},
        {numero: '44', name: 'Loire-atlantique - Nantes'},
        {numero: '45', name: 'Loiret - Orléans'},
        {numero: '46', name: 'Lot - Cahors'},
        {numero: '47', name: 'Lot-et-garonne - Agen'},
        {numero: '48', name: 'Lozère - Mende'},
        {numero: '49', name: 'Maine-et-loire - Angers'},
        {numero: '50', name: 'Manche - Saint-lô'},
        {numero: '51', name: 'Marne - Châlons-en-champagne'},
        {numero: '52', name: 'Haute-marne - Chaumont'},
        {numero: '53', name: 'Mayenne - Laval'},
        {numero: '54', name: 'Meurthe-et-moselle - Nancy'},
        {numero: '55', name: 'Meuse - Bar-le-duc'},
        {numero: '56', name: 'Morbihan - Vannes'},
        {numero: '57', name: 'Moselle - Metz'},
        {numero: '58', name: 'Nièvre - Nevers'},
        {numero: '59', name: 'Nord - Lille'},
        {numero: '60', name: 'Oise - Beauvais'},
        {numero: '61', name: 'Orne - Alençon'},
        {numero: '62', name: 'Pas-de-calais - Arras'},
        {numero: '63', name: 'Puy-de-dôme - Clermont-ferrand'},
        {numero: '64', name: 'Pyrénées-atlantiques - Pau'},
        {numero: '65', name: 'Hautes-Pyrénées - Tarbes'},
        {numero: '66', name: 'Pyrénées-orientales - Perpignan'},
        {numero: '67', name: 'Bas-rhin - Strasbourg'},
        {numero: '68', name: 'Haut-rhin - Colmar'},
        {numero: '69', name: 'Rhône - Lyon'},
        {numero: '70', name: 'Haute-saône - Vesoul'},
        {numero: '71', name: 'Saône-et-loire - Mâcon'},
        {numero: '72', name: 'Sarthe - Le mans'},
        {numero: '73', name: 'Savoie - Chambéry'},
        {numero: '74', name: 'Haute-savoie - Annecy'},
        {numero: '75', name: 'Paris - Paris'},
        {numero: '76', name: 'Seine-maritime - Rouen'},
        {numero: '77', name: 'Seine-et-marne - Melun'},
        {numero: '78', name: 'Yvelines - Versailles'},
        {numero: '79', name: 'Deux-sèvres - Niort'},
        {numero: '80', name: 'Somme - Amiens'},
        {numero: '81', name: 'Tarn - Albi'},
        {numero: '82', name: 'Tarn-et-Garonne - Montauban'},
        {numero: '83', name: 'Var - Toulon'},
        {numero: '84', name: 'Vaucluse - Avignon'},
        {numero: '85', name: 'Vendée - La roche-sur-yon'},
        {numero: '86', name: 'Vienne - Poitiers'},
        {numero: '87', name: 'Haute-vienne - Limoges'},
        {numero: '88', name: 'Vosges - Épinal'},
        {numero: '89', name: 'Yonne - Auxerre'},
        {numero: '90', name: 'Territoire de belfort - Belfort'},
        {numero: '91', name: 'Essonne - Évry'},
        {numero: '92', name: 'Hauts-de-seine - Nanterre'},
        {numero: '93', name: 'Seine-Saint-Denis - Bobigny'},
        {numero: '94', name: 'Val-de-marne - Créteil'},
        {numero: '95', name: "Val-d'Oise - Cergy Pontoise"},
        {numero: '971', name: 'Guadeloupe - Basse-terre'},
        {numero: '972', name: 'Martinique - Fort-de-france'},
        {numero: '973', name: 'Guyane - Cayenne'},
        {numero: '974', name: 'La réunion - Saint-denis'},
        {numero: '976', name: 'Mayotte - Mamoudzou'},
    ];
    Departement.insertMany(departements, (error, dep) => {
        if(error) {
            console.log(error);
        } else {
            console.log(dep.length, "items imported");
            console.log("###################################");
            console.log('Data successfully processed');
            console.log("###################################");
            process.exit();
        }
    });
} catch (error) {
    console.log('error => ', error);
    process.exit(1);
}