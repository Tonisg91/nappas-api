const confirmationTemplate = (userId) => {
    const template = `
        <div style = "background: #4D716D; height: 100px; background-size: cover;
            background - repeat: no - repeat; text - align: center; padding: 35px; font - size: 1.5em; color:#cce0dd; ">
            </div >
        <section
            style="padding: 20px; margin: 50px; border: 2px solid #4D716D; border-radius:40px; text-align: center;">
            
            <h1> We are happy to have you with us!</h1 >
            <p>
                This is a confirmation email that your <strong>Ñappas</strong> account has been created!<br>
                <strong>Just miss one last step.</strong>
            </p>

            <p>Please, enter this link to verify your account</p>
            <a href="#" >VERIFY</a>
            <div
                style="margin-top: 3em"
            >
                <img
                    src="https://res.cloudinary.com/dkejgwlha/image/upload/v1592555603/friends_amcn0b.png"
                    alt="Nappas logo">
            </div>
        </section>
        `

        //TODO: Sustituir links
    return template
}

module.exports = confirmationTemplate