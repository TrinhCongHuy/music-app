import mongoose from "mongoose";

const userSchema = new mongoose.Schema({  
    fullName: String,
    email: String,
    type: {
        type: String,
        default: "LOCAL"
    },
    password: String,
    tokenUser: String,
    phone: String,
    avatar: String,
    status: {
        type: String,
        default: "active"
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
});
  

const User = mongoose.model('User', userSchema, 'users');
export default User;