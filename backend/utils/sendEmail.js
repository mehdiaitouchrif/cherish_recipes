import nodemailer from 'nodemailer'

const sendEmail = async (options) => {
	const transporter = nodemailer.createTransport({
		service: process.env.SMTP_HOST,
		auth: {
			user: process.env.SMTP_EMAIL,
			pass: process.env.SMTP_PASSWORD,
		},
	})

	const message = {
		from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL} >`,
		to: options.email,
		subject: options.subject,
		text: options.message,
		html: `
            <div>
                <h2>Cherich Recipes</h2>
                <h3>${options.message} </h3> 
                <h2>${options.htmlTitle} </h2>
            </div>
        `,
	}

	const info = await transporter.sendMail(message)

	console.log('Message sent', info.messageId)
}

export default sendEmail
