import mongoose ,{Schema} from 'mongoose';
import mongooseaggregatePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema = new Schema({
        videoFile:{
            type:String, //cloudinary url
            required:true
        },
        thumbnail:{
            type:String, //cloudinary url
            required:true
        },
        title:{
            type:String,
            required:true,
        },
        discription:{
            type:String,
            required:true
        },
        duration:{
            type:Number,
            required:true
        },
        views:{
            type:Number,
            default:0
        },
        ispublished:{
            type:Boolean,
            default:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:'User',
        },
    },
    {
        timeStamp:true
    }
)


videoSchema.plugin(mongooseaggregatePaginate)
export const Video= mongoose.model("video",videoSchema)