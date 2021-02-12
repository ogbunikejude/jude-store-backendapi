const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		unique: true,
	},
	slug: {
		type: String,
		unique: true,
	},
	description: {
		type: String,
		required: [true, 'field is required'],
	},
	categories: {
		type: String,
		required: [true, 'please select a category'],
	},
	price: {
		type: String,
		required: true,
	},
	sale_price: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
});
const Product = mongoose.model('products', productSchema);
module.exports = Product;
