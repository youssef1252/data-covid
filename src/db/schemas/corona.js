import mongoose from 'mongoose';

const CoronaSchema = mongoose.Schema({
    dep:
    {
        type: String,
        required: true
    },
    jour:
    {
        type: Date,
        required: true
    },
    hosp:
    {
        type: Number,
        required: true
    },
    rea:
    {
        type: Number,
        required: true
    },
    rad:
    {
        type: Number,
        required: true
    },
    dc:
    {
        type: Number,
        required: true
    },
    created_at:
    {
        type: Date,
        default: Date.now
    }
});

const Corona = mongoose.model('Corona', CoronaSchema);
export default Corona;