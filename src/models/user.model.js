import mongoose,{Schema} from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowecase:true,
        trim:true,
        index:true
},
email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
},fullname:{
    type:string,
    required:true,
    trim:true,
    index:true
},
avatar:{
    type:String,
    reqired:true,
},
coverImage:{
    type:String,
},
watchHistory:[{
    type:Schema.Type.ObjectId,
    ref:'Video'
}],
password:{
    type:String,
    required:[true,'password is required']
},
},
{
    timestamps:true
}
)

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordcorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){
    jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRES
    }
)
}
userSchema.methods.generateRefreshToken=function(){
    jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRES
    }
)
}

export default User= mongoose.model('User',userSchema)