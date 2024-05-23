class Admin {
    static adminHome(req, res) {
        try {
            res.send(`Admin Home`)
        } catch (error) {
            res.send(error)
        }
    }

    static otherMenusAdmin(req, res) {
        try {
            res.send(`Other Menus Admin`)
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Admin