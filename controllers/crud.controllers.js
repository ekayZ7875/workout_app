const jwt = require('jsonwebtoken')
const db = require('../db/db.js')
const bcrypt = require('bcrypt')



const editingWorkouts = (async(req,res)=>{
    try{
        const{exercise,sets,reps} = req.body
        const updatedWorkout = await db('Workouts').where({id:req.params.id})
       .update({exercise,sets,reps}).returning('*')
       res.json(updatedWorkout[0])

        } catch(error){
            console.error(error)
            res.json({message:'Some Internal Error Occurred'})
        }
})

const deletingWorkout = (async(req,res)=>{
    try{
        const deletedWorkout = await db('Workouts').where({id:req.params.id}).del().returning('*')
        res.json(deletedWorkout[0])
    } catch(error){
        console.error(error)
        res.json({message:'Some Internal Error Ocuured'})
    }
})

module.exports = {
    editingWorkouts,
    deletingWorkout
}