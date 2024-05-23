const { User } = require('../models')
const bcrypt = require('bcryptjs');

class AuthLogin {
    static async Login(req, res) {
        try {
            res.render(`Login`)
        } catch (error) {
            res.send(error)
        }
    }

    static async LoginPost(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = { id: user.id, email: user.email, role: user.role };
                if (user.role === 'admin') {
                    res.redirect('/admin');
                } else {
                    res.redirect('/buyer');
                }
            } else {
                const error = `Invalid Username/Password`
                res.redirect(`/?${error}`);
            }
        } catch (error) {
            res.send(error)
        }
    }

    static async Register(req, res) {
        try {
            res.render(`Register`)
        } catch (error) {
            res.send(error)
        }
    }

    static async RegisterPost(req, res) {
        try {
            const { email, password, role } = req.body
            await User.create({ email, password, role })
            res.redirect(`/`)
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = AuthLogin