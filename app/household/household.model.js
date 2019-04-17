const mongoose = require('mongoose');
const Joi = require('joi');

const householdSchema = new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'user'},
    address: {type: String, required: true},
    roommate: {type: Array},
    bills: [{type: mongoose.Schema.Types.ObjectId, ref: 'bill'}]
})


householdSchema.methods.serialize = function () {
    let user;
    if(typeof this.user.serialize === 'function') {
        user = this.user.serialize();
    } else {
        user = this.user;
    }

    return {
        id: this._id,
        user: user,
        address: this.address,
        roommate: this.roommate,
        bills: this.bills

    };
};

const HouseholdJoiSchema = Joi.object().keys({
    user: Joi.string().optional(),
    address: Joi.string().min(1).required(),
    roommate: Joi.array().optional(),
    bills: Joi.array().optional()
})

const Household = mongoose.model('household', householdSchema);

module.exports= { Household, HouseholdJoiSchema }