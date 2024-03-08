const jwt = require('jsonwebtoken')
const db = require('../db/db.js')
const bcrypt = require('bcrypt')
const authenticatingUser = require('../middlewares/auth.middlewares.js')






const registerUser = (async(req,res)=>{
    try{
        const{username,password} = req.body
    const hashedPassword = await bcrypt.hash(password,16)
    const insertion = await db('Users_2').insert({
        username,
        password:hashedPassword
    })  
    if(insertion){
        res.json({message:'User Created Successfully'})
    }  
    } catch(error){
        console.error(error)
        res.json({message:'Some intrenal error occurred'})
    }
})

const loginUser = (async(req,res)=>{
    try {
        const{ username,password } = req.body
        if(!username||!password){
            res.json({message:'username or password is invalid'})
        }
        const user = await db('Users_2').where({username}).first()
        if(!user){
            res.json({message:'User not found'})
        }
        const passwordMatch = await bcrypt.compare(password,user.password)
if(user && passwordMatch){
    const token  = jwt.sign({userId:user.id,username:user.username},process.env.SECRET_KEY,{expiresIn:'1h'})
    res.json({message:'Login In succesfully',token})
} else{
    res.json({message:'Invalid Credentials'})
}
        
    } catch(error){
        console.error(error)
        res.json({message:'Some Internal Error Occurred'})
    }
})

const profile = (async(req,res)=>{
    try{
        const id = req.params.id
        const user = await db('Users_2').where('id',id).first()
        console.log(user)
        res.json(user)
    } catch(error){
        console.error(error)
        res.json({message:'Some Internal Error Occurred'})

    }
})

const workouts = (async(req,res)=>{
    try{
        const{userId,exercise,sets,reps} = req.body
        const workouts = await db('Workouts').insert({
            userId,
            exercise,
            sets,
            reps
        })
        if(workouts){
            res.json({message:'Exercise saved successfully'})
        }
        res.json(workouts[0]);
    } catch(error){
        console.error(error)
        res.json({message:'Some Internal Error Occurred'})
    }

})

const fetchingWorkout = (async(req,res)=>{
    try{
        const id = req.params.id
        const workouts = await db('Workouts').where('id',id)
        res.json(workouts)
    } catch(error){
        console.error(error)
        res.json({message:'Some Internal Error Occurred'})
    }
})

const postingMeals = (async(req,res)=>{
    try{
        const{ user_id,food,calories } = req.body
        const newMeal = await db('Meals').insert({user_id,food,calories}).returning('*')
        res.json(newMeal[0])
    } catch(error){
        console.error(error)
        res.json({message:'Some Internal Error Occurred'})
    }
})

module.exports = {
    registerUser,
    loginUser,
    profile,
    workouts,
    fetchingWorkout,
    postingMeals
}