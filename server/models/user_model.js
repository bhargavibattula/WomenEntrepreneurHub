import mongoose from "mongoose"

const UserSchema = new  mongoose.Schema({
    email : {
        type : String ,
        required : true ,
        unique : true ,
         index : true
    } ,
    password : {
        type : String ,
        required : true
    },
    name : {
        type : String ,
        required : true 
    },
    role : {
        type : String ,
        enum : ['entrepreneur' , 'visitor' , 'admin'] ,
        default : 'visitor' 
    } ,
    profileImage : {type : String } ,
    bio  : {type : String } ,
    contactInfo : {
        phone : String ,
        address : {
            country :String ,
            state : String
        } ,
        socialLinks : {
            facebook : String ,
            instagram : String ,
            twitter : String
        }
    } ,
    preferences : {
        categories : [String] ,
        notifications : {type : Boolean , default : true}
    } ,
    businesses : [{type : mongoose.Schema.Types.ObjectId , ref : "Business"}],
    eventsAttended : [{type : mongoose.Schema.Types.ObjectId , ref : "Event"}],
    dateJoined : {type : String , default : Date.now} ,
    lastLogin : {
        type : Date ,
        default : Date.now
    },
    isVerified : {
        type : Boolean ,
        default : false
    } ,
    isProfileSetup : {type : Boolean , default : false},
    verificationToken : String ,
    verificationTokenExpiresAt : Date ,
    resetPasswordVerificationToken : String ,
    resetPasswordVerificationTokenExpiresAt : Date 
} , { timestamps: true });

UserSchema.index({name : "text" , bio : "text" , tags : "text"});

export const User = mongoose.model( "User" ,  UserSchema);