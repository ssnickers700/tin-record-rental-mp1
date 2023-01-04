const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Record = sequelize.define("Record", {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    recordName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [1, 60],
                msg: "len_1_60"
            }
        }
    },
    artistName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [1, 60],
                msg: "len_1_60"
            }
        }
    },
    price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            isNumeric: {
                msg: "notNumber"
            },
            min: {
                args: [0],
                msg: "numberRange"
            },
            max: {
                args: [1000000],
                msg: "numberRange"
            }
        }
    },
    unit: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            isNumeric: {
                msg: "notNumber"
            },
            min: {
                args: [0],
                msg: "numberRange"
            },
            max: {
                args: [1000000],
                msg: "numberRange"
            },
            isInt: {
                msg: "notInteger"
            }
        }
    }
});

module.exports = Record;

