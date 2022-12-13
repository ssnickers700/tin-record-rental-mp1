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
                msg: "Pole jest wymagane"
            },
            len: {
                args: [1, 60],
                msg: "Pole powinno zawierać od 1 do 60 znaków"
            }
        }
    },
    artistName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [1, 60],
                msg: "Pole powinno zawierać od 1 do 60 znaków"
            }
        }
    },
    price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isNumeric: {
                msg: "Wartość powinna być liczbą"
            },
            min: {
                args: [0],
                msg: "Podaj wartość od 0 do 1,000,000"
            },
            max: {
                args: [1000000],
                msg: "Podaj wartość od 0 do 1,000,000"
            }
        }
    },
    unit: {
        type: Sequelize.INTEGER,
        allowNull: false,validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isNumeric: {
                msg: "Wartość powinna być liczbą"
            },
            min: {
                args: [0],
                msg: "Podaj wartość od 0 do 1,000,000"
            },
            max: {
                args: [1000000],
                msg: "Podaj wartość od 0 do 1,000,000"
            },
            isInt: {
                msg: "Wartość powinna być liczbą całkowitą"
            }
        }
    }
});

module.exports = Record;

