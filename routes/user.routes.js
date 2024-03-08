const { Router } = require('express')
const{ registerUser,loginUser,profile,workouts,fetchingWorkout } = require('../controllers/user.controllers.js')
const{ forgetPassword,resetPassword } = require('../controllers/forget-password.controllers.js')
const{ editingWorkouts,deletingWorkout } = require('../controllers/crud.controllers.js')
const { authenticatingUser } = require('../middlewares/auth.middlewares.js')



const router = Router()

router.route('/register-user').post(registerUser)
router.route('/login-user').post(loginUser)
router.route('/profile/:id').get(authenticatingUser,profile)
router.route('/workouts').post(authenticatingUser,workouts)
router.route('/fetch-workout/:id').get(authenticatingUser,fetchingWorkout)
router.route('/delete-workout/:id').delete(authenticatingUser,deletingWorkout)
router.route('/update-workout/:id').delete(authenticatingUser,editingWorkouts)
router.route('/forgot-password').post(forgetPassword)
router.route('/reset-password').post( resetPassword)

module.exports = router