const { where } = require('sequelize');
const { Product } = require('../models')
class Admin {
    static async adminHome(req, res) {
        try {
            let data = await Product.findAll();
            res.render('Admin', { data })
        } catch (error) {
            res.send(error)
        }
    }

    static async addProduct(req, res) {
        try {
            res.render('AddProduct')
        } catch (error) {
            res.send(error)
        }
    }

    static async postAddProduct(req, res) {
        try {
            let { title, price, stock, genre, releaseYear, imageURL } = req.body;
            await Product.create({ title, price, stock, genre, releaseYear, imageURL });
            res.redirect('/admin')
        } catch (error) {
            let errorMessages = [];
            if (error.name === 'SequelizeValidationError') {
                errorMessages = error.errors.map(err => err.message);
            } else {
                errorMessages.push(error.message);
            }
            res.render('AddProduct', { errors: errorMessages });
        }
    }
    static async editProduct(req, res) {
        try {
            let { productId } = req.params;
            let data = await Product.findByPk(productId);
            res.render('EditProduct', { data })
        } catch (error) {
            res.send(error)
        }
    }
    static async postEditProduct(req, res) {
        try {
            let { productId } = req.params;
            let { title, price, stock, genre, releaseYear, imageURL } = req.body;
            await Product.update({ title, price, stock, genre, releaseYear, imageURL }, { where: { id: productId } });
            res.redirect('/admin')
        } catch (error) {
            if (error.name == 'SequelizeValidationError') {
                res.send(error.errors[0].message)
            } else {
                res.send(error)

            }
        }
    }
    static async deleteProduct(req, res) {
        try {
            let { productId } = req.params;
            let data = await Product.findByPk(productId);
            data.destroy();
            res.redirect('/admin');
        } catch (error) {
            res.send(error)
        }
    }

}

module.exports = Admin