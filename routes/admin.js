const { adminHome, otherMenusAdmin, addProduct, postAddProduct } = require("../controllers/AdminController");
const { isAuthenticated, isAdmin } = require(`./middleware`)
const router = require(`express`).Router();

router.get('/', isAuthenticated, isAdmin, adminHome)
// router.get('/othermenusadmin', isAuthenticated, isAdmin, otherMenusAdmin)
router.get('/addProduct', isAuthenticated, isAdmin, addProduct)
router.post('/addProduct', isAuthenticated, isAdmin, postAddProduct)

module.exports = router