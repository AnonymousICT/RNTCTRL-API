const express = require('express');
const Joi = require('joi');
const billRouter = express.Router();

const { HTTP_STATUS_CODES } = require('../config.js');
const { jwtPassportMiddleware } = require('../auth/auth.strategy');
const { Bill, BillJoiSchema } = require('./bill.model');

//create new Bill
billRouter.post('/', jwtPassportMiddleware, (req, res)=> {
    const newBill = {
        household: req.household.id,
        billType: req.body.billType,
        billAmount: req.body.billAmount,
        billDue: req.body.billDue
    };

    const validation = Joi.validate(newBill, BillJoiSchema);
        if(validation.error) {
            return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json(
                {error:validation.error});
        }
        Bill.create(newbill)
        .then(createdBill =>{
            return res.status(HTTP_STATUS_CODES.CREATED).json(createdBill.serialize())
        })
        .catch(error=> {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        })
})

//get household's bill
billRouter.get('/', jwtPassportMiddleware, (req,res)=>{
    Bill.find({ household: req.household.id })
    .populate('household')
    .then(bills => {
        return res.status(HTTP_STATUS_CODES.OK).json(bills.map(Bill => Bill.serialize())
        );
    })
    .catch(error=> {
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
    })
})

//get bill by ID
billRouter.get('/:Billid', (req,res)=>{
    Bill.findById(req.params.Billid)
        .populate('household')
        .then(Bill => {
            return res.status(HTTP_STATUS_CODES.OK).json(Bill.serialize())
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        })
})

//update bill by Id
billRouter.put('/:Billid', jwtPassportMiddleware, (req,res)=>{
    const BillUpdate = {
        billType: req.body.billType,
        billAmount: req.body.billAmount,
        billDue: req.body.billDue
    };
    const validation = Joi.validate(BillUpdate, BillJoiSchema);
    if(validation.error) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
            error: validation.error
        })
    }
    Bill.findByIdAndUpdate(req.params.Billid, BillUpdate)
        .then(()=>{
            return res.status(HTTP_STATUS_CODES.NO_CONTENT).end();
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
})

//remove bill by ID
billRouter.delete('/:Billid', jwtPassportMiddleware, (req,res) => {
    Bill.findByIdAndDelete(req.params.Billid)
        then(()=>{
            return res.status(HTTP_STATUS_CODES.NO_CONTENT).end()
        })
        .catch(error=> {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        })
})

module.exports = { billRouter }