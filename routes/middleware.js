function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/');
    }
}


function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    } else if (req.session.user) {
        res.redirect('/buyer');
    } else {
        res.redirect('/');
    }
}


function isBuyer(req, res, next) {
    if (req.session.user && req.session.user.role === 'buyer') {
        return next();
    } else if (req.session.user) {
        res.redirect('/admin');
    } else {
        res.redirect('/');
    }
}


function redirectToHomeIfLoggedIn(req, res, next) {
    if (req.session.user) {
        if (req.session.user.role === 'admin') {
            return res.redirect('/admin');
        } else {
            return res.redirect('/buyer');
        }
    } else {
        next();
    }
}

module.exports = { isAuthenticated, isAdmin, isBuyer, redirectToHomeIfLoggedIn };