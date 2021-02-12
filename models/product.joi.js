const joi= require('joi')

const createProductSchema = joi.object({
    name: joi.string().min(3).max(60).required(),
    description: joi.string().min(3).required().messages({
        'string.empty': 'Description is reqired',
        'any.required': 'Description is reqired',
    }),
    categories: joi.string().min(3).max(30).required(),
    price: joi.string().min(3).max(30).required(),
    sale_price: joi.string().min(3).max(30).required(),
    image: joi.string().min(3).required(),
})
    

    module.exports ={createProductSchema}