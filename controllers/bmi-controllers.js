const bmiCalculator = (async(req,res)=>{
    const { user_id,weight,height } = req.body
    const heightInMetres = height/100
    const bmi = weight/(heightInMetres*heightInMetres)

    res.json({bmi})
    if(bmi<18.5){
        res.json({message:'Underweight'})
    } else if(bmi>18.5 || bmi <24.9){
        res.json({message:'Normal Weight'})
    } else if(bmi>25 || bmi<29.9){
        res.json({message:'Overweight'})
    } else if(bmi>30){
        res.josn({message:'Obesity'})
    }

})

module.exports = {
    bmiCalculator
}