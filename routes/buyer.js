const { buyerHome, otherMenusBuyer } = require("../controllers/BuyerController");
const { isAuthenticated, isBuyer } = require(`./middleware`)
const router = require(`express`).Router();

router.get('/', isAuthenticated, isBuyer, buyerHome)
router.get('/othermenusbuyer', isAuthenticated, isBuyer, otherMenusBuyer)

module.exports = router