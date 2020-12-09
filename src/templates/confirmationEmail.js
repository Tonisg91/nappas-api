const config = require('../configs/global.config')

const confirmationTemplate = (email, userId) => {
    const template = `
        <h1>This is a template to verify your account.</h1>

        <h2>And this is your email: ${email}</h2>

        <h3>Click on the next link to verificate your account.</h3>

        <form action="${config.URL}/api/verify/${userId}  method="POST">
            <button type="submit" > 
                Verify
            </button>
        </form>

    `

    //TODO: Cambiar y adecentar plantilla email.

    return template
}

module.exports = confirmationTemplate