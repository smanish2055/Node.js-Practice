const mongoose = require('mongoose');

const validator = require('validator');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://127.0.0.1:27017/School',{
    useNewUrlParser: true
}).then((conn) =>{
    
    console.log("Db Connection successful");
}).catch((error) =>{
    console.log(error);
})

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your name']
    },
    email:{
        type:String,
        required:[true,'Please enter an email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please enter a valid email.']
    },
    photo:String,
    password:{
    type:String,
    required:[true,'Pleae enter a password.'],
    minlength:8
    },
    confirmPassword:{
        type:String,
        required:[true,'Please confirm your password'],
        validate:{
            // this validator will only work for save() and create()
            validator:function(val){
                return val == this.password;
            },
            message:'password and canfirm password mismatch'
        }
    }
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12);
    this.confirmPassword = undefined;
    next();
})

userSchema.methods.comparePasswordInDb = async function(pswd,pswdDB){
    return await bcrypt.compare(pswd,pswdDB);
}
const User = mongoose.model('User',userSchema)

module.exports = User;