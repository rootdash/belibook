const AuthLogin = require("../controllers/AuthController");
const router = require(`express`).Router();
const { isAuthenticated, isAdmin, isBuyer, redirectToHomeIfLoggedIn } = require(`./middleware`)

router.get('/', redirectToHomeIfLoggedIn, AuthLogin.Login)
router.post('/', AuthLogin.LoginPost)
router.get('/register', redirectToHomeIfLoggedIn, AuthLogin.Register)
router.post('/register', AuthLogin.RegisterPost)

router.use(`/admin`, isAuthenticated, isAdmin, require(`./admin`))
router.use(`/buyer`, isAuthenticated, isBuyer, require(`./buyer`))


module.exports = router