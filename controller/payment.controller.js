const Payment = require("../models/payment.model");

exports.CreatePayment=async(req,res)=>{
    try {
        const {projectId , amount , paymentDate,method}=req.body;

        const project =await Payment.create({
            projectId, amount, paymentDate,method
        })
        if(!project){
            return res.status(400).json({
                success:false,
                message:"Some errors"
            })
        }
        return res.status(200).json({
            success:true,
            message:"payment done"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Error");
    }
}
//find payment
exports.FindAllPayment=async(req,res)=>{
    try {
        const find=await Payment.find().populate("projectId")
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No project Found"
            })
        }
        return res.status(200).json({
            success:true,
            project:find
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Error");
    }
}
//Find By id
exports.FindByIdPayment=async(req,res)=>{
    try {
        const find=await Payment.findById(req.params.id).populate("projectId")
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No project Found"
            })
        }
        return res.status(200).json({
            success:true,
            project:find
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Error");
    }
}

//delete Payment
exports.DeletePayment= async(req,res)=>{
    try {
        const find=await Payment.findByIdAndDelete(req.params.id)
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No project Found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Payment Deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Error");
    }
}

//update Payment
exports.UpdatePayment= async(req,res)=>{
    try {
        const update=await Payment.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!update){
            return res.status(400).json({
                success:false,
                message:"No project Found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Payment Updated"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Error");
    }
}
// Simulate a payment

exports.PaymentStatus= async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        const simulatedPaymentSuccess = true; 

        if (simulatedPaymentSuccess) {
            payment.status = 'paid';
            await payment.save();
            res.json({ message: 'Payment successful', payment });
        } else {
            res.status(400).json({ error: 'Payment failed' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}