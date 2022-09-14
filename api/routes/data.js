const express = require('express');
const  mongoose  = require('mongoose');
const router = express.Router();
const Data = require('../module/data');

router.get('/showEmp', (req, res, next) => {
    Data
    .find()
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            product: docs.map(doc => {
                return {
                    name: doc.name,
                   email : doc.email,
                   mobileNumber : doc.mobileNumber,
                   department : doc.department,
                    _id: doc._id,
                }
            })
        }
        if (docs.length > 0) {
            res.status(200).json(response)
        } else {
            res.status(404).json({
                message: 'Entry not found'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error : err 
        })
    })
})


router.post('/addEmp', (req, res, next) => {
    const data = new Data({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.data.name,
        email : req.body.data.email,
        mobileNumber : req.body.data.number,
        department  : req.body.data.department
    });
    data.save()
    .then(result => {
        res.status(201).json({
            message : 'Data Stored',
            createData  : {
                _id : result._id,
                name  : result.name,
                email : result.email,
                mobileNumber : result.mobileNumber,
                department  : result.department,
                request : {
                    type : 'GET',
                    URL : 'http://localhost:3000/data' + result._id
                }
            }

        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err,
        })
    })
})

router.patch('/:dataId', (req, res, next) => {
    const id = req.params.dataId;
    updateOps = {};
    for(let ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Data.update({ _id : id }, { $set : updateOps })
    .exec()
    .then(result => {
        res.status(200).json({
            message : 'Data Updeted',
            url : 'http://localhost:3000/data/' + id
        });
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    })
})


router.get('/:dataId', (req, res, next) => {
    const id = req.params.dataId;
    Data.findById(id)
    .select("name _id email mobileNumber department")
    .exec()
    .then(docs => {
        if(docs) {
            res.status(200).json({
                data  : docs
            })
        } else {
            res.status(400).json({
              message : 'No entery found'
            });
        }
    })
    .catch(err => {
        error : err;
    })
})

router.delete('/:dataId' , (req, res, next) => {
    const id = req.params.dataId;
    Data.remove({_id : id})
    .exec()
    .then(result => {
        res.status(200).json({ 
            message : 'Data Deleted'
        });
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })
})

module.exports = router