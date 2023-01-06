const ClientRepository = require("../repository/sequelize/ClientRepository");
const authUtil = require("../util/authUtils");

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    ClientRepository.findByEmail(email)
        .then(client => {
            if (!client) {
                res.render("index", {
                    navLocation: "",
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            } else if (authUtil.comparePassword(password, client.password) === true) {
                req.session.loggedUser = client;
                res.redirect("/");
            } else {
                res.redirect("index", {
                    navLocation: "",
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect("/")
}