const router = require('express').Router();
const {
	createProduct,
	getAllProduct,
	getProduct,
	updateProduct,
	deleteProduct,
} = require('../controllers/product.controller');
const { checkAuthorization } = require('../controllers/user.controller');

router.route('/').get(checkAuthorization, getAllProduct).post(createProduct);

router
	.route('/:slug')
	.get(getProduct)
	.patch(updateProduct)
	.delete(deleteProduct);

module.exports = router;
