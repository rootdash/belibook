class Buyer {
    static buyerHome(req, res) {
        try {
            res.send(`Buyer Home`)
        } catch (error) {
            res.send(error)
        }
    }

    static otherMenusBuyer(req, res) {
        try {
            res.send(`Other Menus Buyer`)
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Buyer