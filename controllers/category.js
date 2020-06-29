const Category = require('../models/category');

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
        if (err) {
            return res.status(400).json({
                error: "Category not found in DB"
            })
        }

        req.category = cate;
        next();
    });
}

exports.createCrategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to save category in DB"
            })
        }
        res.json({ category })
    })
}

exports.getCategory = (req, res) => {
    return res.json(req.category)
}

exports.getAllCategories = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to found categories in DB"
            })
        }

        res.json(categories)
    })
}

exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err, updatedCategory) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to update category in DB"
            })
        }
        res.json(updatedCategory)
    })
}

exports.romoveCategory = (req, res) => {
    const category = req.category;

    category.remove((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to delete category in DB"
            })
        }
        res.json({
            message: "Successfully deleted category"
        })
    })
}