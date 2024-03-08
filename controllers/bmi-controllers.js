const bmiCalculator = (async(req,res)=>{
    const { weight,height } = req.body
    const heightInMetres = height/100
    const bmi = weight/(heightInMetres*heightInMetres)

    res.json({bmi})

})

module.exports = {
    bmiCalculator
}