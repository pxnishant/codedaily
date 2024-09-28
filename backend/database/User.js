import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({

    email: {type: String, required: true, unique: true},
    difficulty: {type: [Boolean], default: []},
    topics: {type: [Boolean], default: []},
    firstTime: Boolean,
    doneTill: Number,

})

const User = mongoose.model('User', userSchema)

export default User;