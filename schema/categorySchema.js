const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const category = new Schema({
    'categoryId':String,
    'categoryName':String,
    'description':String
}, { collection: 'Category' });

module.exports = mongoose.model('Category',category);