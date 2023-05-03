const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: '----Not available----'
    },
    isbn: {
        type: String,
        minlength: 10,
        maxlength: 13,
        required: true,
        unique: true
    },
    cat: {
        type: String,
        enum: ['Computer Science and Engineering','Civil Engineering',
        'Mechanical Engineering','Electronics and Communication Engineering',
       'Electrical and Electronics Engineering','Aeronautical Engineering'],
        required: true
    },
    copies: {
        type: Number,
        min: 1,
        max: 1000,
        required: true
    },
    shelf: {
        type: Number,
        min: 1,
        max: 100,
        required: true
    },
    floor: {
        type: Number,
        min: 0,
        max: 8
    },
    accession: {
        type: Number,
        minlength: 5,
        maxlength: 5
    },
}, {
    timestamps: true
});
var Books = mongoose.model('Book',bookSchema);

module.exports=Books;