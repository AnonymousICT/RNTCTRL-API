const express = require('express');
const Joi = require('joi');
const householdRouter = express.Router();

const { HTTP_STATUS_CODES } = require('../config.js');
const { jwtPassportMiddleware } = require('../auth/auth.strategy');
const { Household, HouseholdJoiSchema } = require('./household.model');

// CREATE NEW Household
householdRouter.post('/', jwtPassportMiddleware, (req, res)=> {
    const newHousehold = {
        user: req.user.id,
        address: req.body.address,
        bills: req.body.bills
    };

    const validation = Joi.validate(newHousehold, HouseholdJoiSchema);
    if (validation.error) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({error: validation.error});
    }
    Household.create(newHousehold)
        .then(createdHousehold => {
            return res.status(HTTP_STATUS_CODES.CREATED).json(createdHousehold.serialize());
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

//GET USER'S Household
householdRouter.get('/', jwtPassportMiddleware, (req,res)=> {
    Household.find({ user: req.user.id })
        .populate('user')
        .then(households => {
            return res.status(HTTP_STATUS_CODES.OK).json(households.map(Household => Household.serialize())
            );
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });

})


//GET ALL households
householdRouter.get('/all', (req, res) => {
    Household.find()
        .populate('user')
        .then(households => {
            return res.status(HTTP_STATUS_CODES.OK).json(
                households.map(Household => Household.serialize())
            );
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});


//GET Household BY ID
householdRouter.get('/:Householdid', (req,res)=>{
    Household.findById(req.params.Householdid)
        .populate('user')
        .then(Household => {
            return res.status(HTTP_STATUS_CODES.OK).json(Household.serialize())
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        })
})
//UPDATE Household BY ID
householdRouter.put('/:Householdid', jwtPassportMiddleware, (req, res)=> {
    const HouseholdUpdate = {
        user: req.body.user,
        address: req.body.address,
        bills: req.body.bills
    };
    const validation = Joi.validate(HouseholdUpdate, HouseholdJoiSchema);
    if (validation.error) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({error: validation.error })
    }
    Household.findByIdAndUpdate(req.params.Householdid, HouseholdUpdate)
        .then(()=>{
            return res.status(HTTP_STATUS_CODES.NO_CONTENT).end();
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
})
//REMOVE Household BY ID
householdRouter.delete('/:Householdid', jwtPassportMiddleware, (req, res) => {
    Household.findByIdAndDelete(req.params.Householdid)
        .then(() => {
            return res.status(HTTP_STATUS_CODES.NO_CONTENT).end();
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});


module.exports = { householdRouter };