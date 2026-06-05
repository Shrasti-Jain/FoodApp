let nodemailer=require('nodemailer')

let transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.APP_PASS
    }
})

let sentMail=async (to,subject,html)=>{
    let options={
        from:process.env.USER_EMAIL,
        to,
        subject,
        html
    }
    await transporter.sendMail(options)
}

module.exports=sentMail