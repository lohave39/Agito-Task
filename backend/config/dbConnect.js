const mongoose = require('mongoose');

const dbConnect=async()=>{
    await mongoose.connect(process.env.MONGO_URI)

    console.log("Database is Coonected")

}

module.exports=dbConnect;