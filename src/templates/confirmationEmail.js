const confirmationTemplate = (email, name = 'a new dear user') => {
    const template = `
        <h1>This is a template for ${name}.</h1>

        <h2>And this is your email: ${email}</h2>
    
    `

    return template
}

module.exports = confirmationTemplate