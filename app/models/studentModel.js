const { type } = require("express/lib/response");

  module.exports = mongoose => {
  
    const userSchema =  mongoose.Schema(
      {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        rollNumber:{type:Number,required:true},
        address:{type:String},
        phoneNumber:{type:Number},
        branch:{type:String},
        year:{type:Number}
      },
      {
        timestamps: true,
      }
    );
  
    const User = mongoose.model("User", userSchema);
    return User;
  };