const Joi = require('joi');

// Validation of new User account
const registerUserSchema = Joi.object({
	firstname: Joi.string().min(3).max(255).required(),
	lastname: Joi.string().min(3).max(255).required(),
	email: Joi.string().min(6).max(255).required().email(),
	password: Joi.string()
		.pattern(
			new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
		)
		.required(),
	repeat_password: Joi.ref('password'),
	phone_number: Joi.number().min(6).required(),
});

// Validation of user Login
const loginUserSchema = Joi.object({
	email: Joi.string().min(6).max(255).required().email(),
	password: Joi.string()
		.pattern(
			new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
		)
		.required(),
});

module.exports = { registerUserSchema, loginUserSchema };
