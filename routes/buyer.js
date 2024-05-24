const { buyerHome, buyerCart, buyerCartPost, buyerPurchasePost, buyerCartDelete, buyerInvoice, egload, buyerProfile, buyerProfilePost } = require("../controllers/BuyerController");
const { isAuthenticated, isBuyer } = require(`./middleware`)
const router = require(`express`).Router();

router.get('/', isAuthenticated, isBuyer, buyerHome)
router.get('/cart', isAuthenticated, isBuyer, buyerCart)
router.post('/cart', isAuthenticated, isBuyer, buyerCartPost)
router.post('/purchase', isAuthenticated, isBuyer, buyerPurchasePost)
router.post('/cart/delete', isAuthenticated, isBuyer, buyerCartDelete)
router.get('/egload', isAuthenticated, isBuyer, egload);
router.get('/invoice', isAuthenticated, isBuyer, buyerInvoice)
router.get('/profile', isAuthenticated, isBuyer, buyerProfile)
router.post('/profile', isAuthenticated, isBuyer, buyerProfilePost)
module.exports = router