import mongoose from 'mongoose';

let yesterday = new Date(new Date().setDate(new Date().getDate()-1));

const ImportedSchema = mongoose.Schema({
    table_name:
    {
        type: String,
        required: true
    },
    created_at:
    {
        type: Date,
        default: yesterday
    }
})

const Imported = mongoose.model('Imported', ImportedSchema);
export default Imported;