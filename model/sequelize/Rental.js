const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Rental = sequelize.define("Rental", {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    startDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            isDate: {
                msg: "dateFormat"
            },
            notAfterPresentDate(value) {
                let dateNow = new Date(),
                    day = '' + dateNow.getUTCDate(),
                    month = '' + (dateNow.getMonth() + 1),
                    year = '' + dateNow.getFullYear();
                if (month.length < 2) {
                    month = '0' + month;
                }
                if (day.length < 2) {
                    day = '0' + day;
                }
                let nowString = [year, month, day].join('-');
                if (new Date(value).getTime() > new Date(nowString).getTime()) {
                    throw new Error("futureDate");
                }
            }
        }
    },
    endDate: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            isDate: {
                msg: "dateFormat"
            },
            notBeforeStartDate(value) {
                if (value) {
                    if (new Date(this.startDate).getTime() > new Date(value).getTime()) {
                        throw new Error("earlyDate");
                    }
                }
            }
        }
    },
    client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            }
        }
    },
    record_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            }
        }
    }
});

module.exports = Rental;

