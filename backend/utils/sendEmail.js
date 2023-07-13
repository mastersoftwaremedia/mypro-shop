const nodemailer=require('nodemailer')
const sendgridTransport=require('nodemailer-sendgrid-transport')

const sendEmail=async options=>{
	//configure nodemailer sendgrid transporter
	const transporter=nodemailer.createTransport(
		sendgridTransport({
			auth: {
				api_key:process.env.SENDGRID_API
			}
		})
	)

	const message={
		from: process.env.EMAIL,
		to: options.email,
		subject: options.subject,
    html: options.message
	}
	await transporter.sendMail(message, (err,resp)=>{
		if(err){
			console.log(err)
		}else{
			console.log(resp)
		}
	})
}
module.exports=sendEmail