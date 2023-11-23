const mongoose = require("mongoose")

const conn = async()=>{
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("veri tabanına baglanıldı")
        
    } catch (error) {
        console.log(error)
    }
}

module.exports=conn;