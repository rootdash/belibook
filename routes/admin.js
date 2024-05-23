const { adminHome, otherMenusAdmin } = require("../controllers/AdminController");
const { isAuthenticated, isAdmin } = require(`./middleware`)
const router = require(`express`).Router();

router.get('/', isAuthenticated, isAdmin, adminHome)
router.get('/othermenusadmin', isAuthenticated, isAdmin, otherMenusAdmin)

module.exports = router