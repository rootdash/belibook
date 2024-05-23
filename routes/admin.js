const { adminHome, addProduct, postAddProduct, editProduct, postEditProduct, deleteProduct } = require("../controllers/AdminController");
const { isAuthenticated, isAdmin } = require(`./middleware`)
const router = require(`express`).Router();

router.get('/', isAuthenticated, isAdmin, adminHome)
// router.get('/othermenusadmin', isAuthenticated, isAdmin, otherMenusAdmin)
router.get('/addProduct', isAuthenticated, isAdmin, addProduct)
router.post('/addProduct', isAuthenticated, isAdmin, postAddProduct)
router.get('/editProduct/:productId', isAuthenticated, isAdmin, editProduct)
router.post('/editProduct/:productId', isAuthenticated, isAdmin, postEditProduct)
router.get('/delete/:productId', isAuthenticated, isAdmin, deleteProduct)

module.exports = router