const RecordRepository = require("../repository/sequelize/RecordRepository");

exports.getRecords = (req, res, next) => {
    RecordRepository.getRecords()
        .then(records => {
            res.status(200).json(records);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getRecordById = (req, res, next) => {
    const recordId = req.params.recordId;
    RecordRepository.getRecordById(recordId)
        .then(record => {
            if (!record) {
                res.status(404).json({message: `Record with ${recordId} not found`});
            } else {
                res.status(200).json(record);
            }
        });
};

exports.createRecord = (req, res, next) => {
    RecordRepository.createRecord(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.updateRecord = (req, res, next) => {
    const recordId = req.params.recordId;
    RecordRepository.updateRecord(recordId, req.body)
        .then(result => {
            res.status(200).json({message: "Record updated", record: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteRecord = (req, res, next) => {
    const recordId = req.params.recordId;
    RecordRepository.deleteRecord(recordId)
        .then(result => {
            res.status(200).json({message: "Removed record", record: result})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

