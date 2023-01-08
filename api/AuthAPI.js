const ClientRepository = require("../repository/sequelize/ClientRepository");
const jwt = require("jsonwebtoken");
const config = require("../config/auth/key");
const bcrypt = require("bcryptjs");

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    ClientRepository.findByEmail(email)
        .then(user => {
            if (!user) {
                return res.status(401).send({message: "notAuth"});
            }

            bcrypt.compare(password, user.password)
                .then(isEqual => {
                    if (!isEqual) {
                        return res.status(401).send({message: "notAuth"});
                    }
                    const token = jwt.sign({
                            email: user.email,
                            password: user.password
                        },
                        config.secret,
                        {expiresIn: "1h"},
                    );
                    res.status(200).json({ token: token, userId: user._id });
                })
                .catch(err => {
                    console.log(err);
                    res.status(501);
                });
        });
}