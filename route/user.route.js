const router = require('express').Router();
const {
	createUser,
	loginUser,
	logoutUser,
	checkAuthorization,
} = require('../controllers/user.controller');

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').post(checkAuthorization, logoutUser);

module.exports = router;
