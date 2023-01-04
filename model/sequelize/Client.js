const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Client = sequelize.define("Client", {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty",
            },
            len: {
                args: [2, 60],
                msg: "len_2_60"
            }
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty",
            },
            len: {
                args: [2, 60],
                msg: "len_2_60"
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "notEmpty",
            },
            len: {
                args: [5, 60],
                msg: "len_5_60"
            },
            isEmail: {
                msg: "notEmail"
            }
        }
    },
    solvency: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: {
                msg: "notEmpty",
            }
        }
    }
});

module.exports = Client;

