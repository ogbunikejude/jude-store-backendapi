const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoute = require('./route/product.route');
const userRoute = require('./route/user.route');
const app = express();
const port = process.env.PORT || 9000;
app.use(cors());
require('dotenv').config();
app.use(express.json());
app.use('/user', userRoute);
app.use('/product', productRoute);

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		app.listen(port, () => {
			console.log(`Server running at port :${port}`);
		});
		console.log('mongoDB connected');
	});
