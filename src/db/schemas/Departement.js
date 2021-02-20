import mongoose from 'mongoose';

const DepartementSchema = mongoose.Schema({
    numero:
    {
        type: String,
        required: 'Enter the number of deparetement'
    },
    name:
    {
        type: String,
        required: 'Enter the name of deparetement'
    }
});

const Departement = mongoose.model('Departement', DepartementSchema);
export default Departement;