const { Product, Order, User, UserProfile } = require('../models')
const { Op } = require(`sequelize`)
var easyinvoice = require('easyinvoice');
var fs = require('fs');
const path = require('path');

class Buyer {
    static async buyerHome(req, res) {
        const { title } = req.query
        const search = {}
        if (title) {
            search.where = {
                title: {
                    [Op.iLike]: `%${title}%`
                }
            }
        }
        try {
            const data = await Product.findAll(search)
            console.log(data)
            res.render('BuyerHome', { data })
        } catch (error) {
            res.send(error)
        }
    }

    static async buyerCart(req, res) {
        try {
            let cart = req.session.cart || [];
            let products = await Promise.all(cart.map(id => Product.findByPk(id)));
            let totalPrice = products.reduce((total, product) => total + product.price, 0);
            res.render('Cart', { products: products, totalPrice: totalPrice });
        } catch (error) {
            res.send(error)
        }
    }

    static async buyerCartPost(req, res) {
        try {
            let productId = req.body.id;
            console.log('Product ID:', productId);
            let cart = req.session.cart || [];
            cart.push(productId);
            req.session.cart = cart;
            res.send({ success: true });
        } catch (error) {
            res.send(error)
        }
    }


    static async buyerPurchasePost(req, res) {
        try {

            var productIds = req.body.productIds;
            let order;
            for (let productId of productIds) {
                order = await Order.create({
                    ProductId: productId,
                    UserId: req.session.user.id,
                    amount: 1,
                    status: 'completed'
                });

                let product = await Product.findByPk(productId);


                product.stock -= 1;


                await product.save();
            }
            req.session.cart = [];

            res.redirect(`/buyer`);
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }

    static async buyerCartDelete(req, res) {
        try {
            let productId = String(req.body.id);
            let cart = req.session.cart || [];
            let index = cart.indexOf(productId);
            if (index > -1) {
                cart.splice(index, 1);
            }
            req.session.cart = cart;
            res.json({ success: true });
        } catch (error) {
            res.send(error)
        }
    }

    static async buyerInvoice(req, res) {
        try {
            let userId = req.session.user.id;
            let orders = await Order.findAll({
                where: { UserId: userId },
                attributes: ['status', 'ProductId'],
                include: [
                    {
                        model: Product,
                        attributes: ['title', 'price']
                    },
                    {
                        model: User,
                        attributes: ['email'],
                        include: [
                            {
                                model: UserProfile,
                                attributes: ['phoneNumber', 'firstName', 'lastName', 'address']
                            }
                        ]
                    }
                ]
            });

            // Map over the orders to get the product details
            let detailedOrders = {
                "currency": "IDR",
                "taxNotation": "vat",
                "sender": {
                    "company": "Your Company Name",
                    "address": "Your Company Address",
                    "zip": "Your Company Zip",
                    "city": "Your Company City",
                    "country": "Your Company Country"
                },
                "client": {
                    "company": orders[0].User.UserProfile.firstName + ' ' + orders[0].User.UserProfile.lastName,
                    "address": orders[0].User.UserProfile.address,
                    "zip": "Client's Zip",
                    "city": "Client's City",
                    "country": "Client's Country"
                },
                "invoiceNumber": "Your Invoice Number",
                "invoiceDate": "Invoice Date",
                "products": orders.map(order => {
                    return {
                        "quantity": "1",
                        "description": order.Product.title,
                        "tax": 0,
                        "price": order.Product.price
                    };
                }),
                "bottomNotice": "Kindly pay your invoice within 15 days."
            };
            easyinvoice.createInvoice(detailedOrders, async function (result) {
                var pdf = result.pdf;
                const pdfPath = path.join(__dirname, 'invoice.pdf');
                fs.writeFileSync(pdfPath, pdf, 'base64');

                res.sendFile(pdfPath);
            })
            // res.send(detailedOrders);
        } catch (error) {
            res.send(error)
        }
    }

    static async egload(req, res) {
        try {
            const orders = await Order.findAllWithUser();
            res.send(orders);
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    }

    static async buyerProfile(req, res) {
        try {
            const userId = req.session.user.id;
            let userProfile = await UserProfile.findOne({ where: { UserId: userId } });
            res.render('UserProfiles', { userProfile }); // redirect to a success page
        } catch (error) {
            console.error(error);
            res.redirect('/error'); // redirect to an error page
        }
    }

    static async buyerProfilePost(req, res) {
        const { phoneNumber, firstName, lastName, address } = req.body;
        const userId = req.session.user.id; // assuming you have user info in session

        try {
            // Check if a UserProfile already exists for the user
            let userProfile = await UserProfile.findOne({ where: { UserId: userId } });
            console.log(userProfile);
            if (userProfile) {
                // If a UserProfile already exists, update it
                userProfile.phoneNumber = phoneNumber;
                userProfile.firstName = firstName;
                userProfile.lastName = lastName;
                userProfile.address = address;
                await userProfile.save();
            } else {
                // If no UserProfile exists, create a new one
                userProfile = await UserProfile.create({
                    phoneNumber,
                    firstName,
                    lastName,
                    address,
                    UserId: userId // set the UserId to the id of the logged in user
                });
            }
            // Render the UserProfile page, passing the userProfile to it
            res.render('UserProfiles', { userProfile });// redirect to a success page
        } catch (error) {
            console.error(error);
            res.redirect('/error'); // redirect to an error page
        }
    }
}

module.exports = Buyer