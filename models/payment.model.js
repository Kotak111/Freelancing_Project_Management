const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    amount: {
        type:Number,
        required:true
    },
    paymentDate: {
        type:Date,
        required:true
    },
    method: {
        type:String,
        required:true
    },
    status: { type: String, enum: ['pending', 'paid'], default: 'pending' }
});

const Payment = mongoose.model('Payment', PaymentSchema);
module.exports=Payment;
