const mongoose = require('mongoose');
const Joi = require('joi');

const billSchema = new mongoose.Schema({
    // user: {type:mongoose.Schema.Types.ObjectId, ref: 'user'},
    household: {type:mongoose.Schema.Types.ObjectId, ref: 'household'},
    billType: {type: String, required: true},
    billAmount: {type: Number, required: true},
    billDue: {type: Date}
})

billSchema.methods.serialize = () => {
    let user;
    if(typeof this.user.serialize === 'function') {
        user = this.user.serialize();
    } else {
        user= this.user;
    }
    return {
        id: this._id,
        user: user,
        billType: this.billType,
        billAmount: this.billAmount,
        billDue: this.billDue
    }
}

const BillJoiSchema = Joi.object().keys({
    user: Joi.string().optional(),
    billType: Joi.string().min(1).required(),
    address: Joi.number().min(1).required(),
    billDue: Joi.date().optional()
})

const Bill = mongoose.model('bill', billSchema);
module.exports = { Bill, BillJoiSchema }
