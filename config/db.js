const { default: mongoose } = require("mongoose");

exports.db=mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("dataabase connected");
    
})
.catch((err)=>{
    console.log("dataabase error");
    
})