// controllers/usersController.js
const usersStorage = require("../storages/usersStorage");

const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 ad 10 characters";

const validateUser = [
    body("firstName").trim()
        .isAlpha().withMessage(`First name ${alphaErr}`)
        .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
];

// We can pass an entire array of middleware validations to our controller.

exports.usersListGet = (req, res) => {
    res.render("index", {
        title: "User list",
        users: usersStorage.getUsers(),
    });
};

exports.usersCreateGet = (req, res) => {
    res.render("createUser", {
        title: "Create user",
    });
};

exports.usersCreatePost = [
    validateUser,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("createUser", {
                title: "Create user",
                errors: errors.array(),
            });
        }
        const { firstName, lastName, email, age, bio } = req.body;
        usersStorage.addUser({ firstName, lastName, email, age, bio });
        res.redirect("/");
    }
];

exports.usersUpdateGet = (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    console.log(user);
    res.render("updateUser", {
        title: "Update user",
        user: user,
    });
};

exports.usersUpdatePost = [
    validateUser,
    (req, res) => {
        const user = usersStorage.getUser(req.params.id);
        console.log(user);
        console.log(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("updateUser", {
                title: "Update user",
                user: user,
                errors: errors.array(),
            });
        } else
            console.log("Error");
        const { firstName, lastName, email, age, bio } = req.body;
        usersStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio });
        res.redirect("/");
    }
]

exports.usersDeletePost = (req, res) => {
    usersStorage.deleteUser(req.params.id);
    res.redirect("/");
};

exports.usersSearch = (req, res) => {
    if (req.query.nameSearch == '') {
        const results = usersStorage.searchEmail(req.query.emailSearch);
        res.render("search", {
            title: "Search Results",
            results: results,
        })
    }
    else if (req.query.emailSearch == '') {
        const results = usersStorage.searchName(req.query.nameSearch);
        res.render("search", {
            title: "Search Results",
            results: results,
        })
    }
    else
        usersStorage.searchBoth(req.query.name, req.query.email);
}