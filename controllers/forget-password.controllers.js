const express = require('express')
const crypto = require('crypto')
const db = require('../db/db.js')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')


const forgetPassword = (async(req,res)=>{
    const { username } = req.body
    const user = await db('Users_2').where({username}).first()
    if(!user){
        return res.json({message:'User Not Found'})
    }

    // Generating a unique token

    const token = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now()+3600000)

    await db('forget-password_1').insert({
        username,
        token,
        expires_at:expiresAt
    })
    
    async function sendMail(){
        const transporter  =nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'eklavyasinghparihar7875@gmail.com',
                pass: 'qnsqoemikkgsyutn'
            }
        })
        const mailOptions = {
            from: 'eklavyasinghpariharr7875@gmail.com',
            to:'mudittandon202005@gmail.com',
            subject: 'Password Reset Request',
            text: `Your password reset token is: ${token}`,
          }
        try {
            const result = await transporter.sendMail(mailOptions)
            console.log('email sent successfully');
        } catch (error) {
            console.log('error',error)  
        }}
        sendMail()
        res.json({ message: 'Password reset email sent.' });
})

const resetPassword = (async(req,res)=>{
    const { username,token,newpassword } = req.body
    const hashedNewPassword = await bcrypt.hash(newpassword,16)

    const resetRecord = await db('forget-password_1')
    .where({ username,token })
    .where('expires_at','>',new Date())
    .first()

    if(!resetRecord){
        return res.json({message:'Invalid Or Expired Token'})
    }
    await db('Users_2')
    .where({ username })
    .update({ password: hashedNewPassword })

    await db('forget-password_1')
    .where({username,token})
    .del()

    res.json({message:'Password Reset Successfully'})
    
})

module.exports = {
    forgetPassword,
    resetPassword
}