module.exports = {
    errHandling: (req, res) => {
        console.log('sampe err handling')
        console.log(req.error)
        let errors = []
        if(req.error.register) {
            if(req.error.register.errors) {
                if(req.error.register.errors.name) {
                    errors.push(req.error.register.errors.name.message)
                }
                if(req.error.register.errors.password) {
                    errors.push(req.error.register.errors.password.message)
                }
                if(req.error.register.errors.email) {
                    errors.push(req.error.register.errors.email.message)
                }
            }
        } else if (req.error.login) {
            errors.push(req.error.login.msg)
        }
        res.status(500).json(errors)
    }
}