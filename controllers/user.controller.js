const User = require('../models/User')
const {registerUserSchema,loginUserSchema} = require('../models/user.joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const createUser = async (req,res) => {
    try{
        const data = req.body
      await registerUserSchema.validateAsync(data,{abortEarly: false})
      data.email = data.email.toLowerCase()
      data.password = await bcrypt.hash(data.password, 8)
    const user = await User.create(data)
    res.status(201).json({status: 'success', data : user})

    }catch(error){
        if(error._original) {
            res.status(400).json({status : 'error', 
            message : error.details.map((item)=> item.message),})
            return
        }
         if (error.code == '11000'){
             res.status(400)
             .json({status:'error', message : 'user already exists'})
             return
         } 
         console.log(error)
         res.status(400).json({ status: 'error', message: error})  
        
    }
}
 
const loginUser = async (req,res) => {
    try {
        const data = req.body
        await loginUserSchema.validateAsync(data,{abortEarly: false})
        const user = await User.findOne({email: data.email.toLowerCase()})
        if(!user) {
            res.status(400).json({status: 'fail', message: 'user doesnot exist, kindly register'})
            return
        }
        const passwordCheck = await bcrypt.compare(data.password, user.password)
        if(!passwordCheck) {
            res.status(401).json({status: 'fail', message: 'incorrect password'})
          return
        }
        const token = jwt.sign({ id : user._id },'SECRETKEY', { expiresIn: '1h' })
        user.token = token
        user.save()
        res.status(201).json({status: 'success', data : user})
    } catch(error){
        if(error._original) {
            res.status(400).json({status: 'fail', message : error.details.map((item) => item.message)})
            return
        }

        console.log(error)
        res.status(400).json({status: 'fail', message: error})
    }
}

const checkAuthorization = async(req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const {id} = jwt.verify(token,'SECRETKEY')
        const user = await User.findById(id)
        if(!user) {
            res.status(402).json({status: 'fail', message: 'unauthorized'})
            return
                }
        if (user.token !== token) {
            res.status(402).json({status: 'fail', message : 'unauthorized'})
            return
        }
        req.user = user
        next()
    } catch(error) {
        res.status(402).json({status: 'fail', message: error})
    }
}
const logoutUser = async(req,res) => {
    try{
        const user = await User.findById(req.user._id)
        user.token = ''
        user.save()
        res.status(200).json({status: 'success', data : user })

    } catch(error) {
        console.log(error)
        res.status(400).json({status:'fail', message : error })

    }
}


module.exports ={createUser,loginUser, checkAuthorization, logoutUser }