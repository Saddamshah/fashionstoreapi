const User = require("../models/user");
const { Order } = require("../models/order");


exports.getUSerById = (req, res, next, id) => {
    User.findById(id, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        req.profile = user
        next()
    });
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    res.json(req.profile)
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) {
                return req.status(400).json({
                    error: "You are not authorized to update this user"
                })
            }

            user.salt = undefined;
            user.encry_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json(user)
        }
    )
}

exports.userPurchaseList = (req, res) => {
    const userId = req.profile._id
    Order.find({ user: userId })
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "No Order in the account"
                });
            }
            return res.json(order);
        });
}

// exports.userPurchaseList = (req, res) => {
//  
//     Order.find({ user: userId })
//         .populate("user", "_id name", (err, order) => {
//             console.log("INSIDE THE ORDER LOOP")
//             if (err) {
//                 return res.status(400).json({
//                     error: "No Order in the account"
//                 });
//             }
//             return res.json(order);
//         });
// }

exports.pushOrderInPurchaseList = (req, res, next) => {

    let purchases = [];
    req.body.order.products.forEach((product) => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            amount: product.price,
            transaction_id: req.body.order.transaction_id
        })
    })

    //Push into DB
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { purchases: purchases } },
        { new: true, useFindAndModify: false },
        (err, purchases) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to save purchase list"
                })
            }
            next();
        }
    )
}