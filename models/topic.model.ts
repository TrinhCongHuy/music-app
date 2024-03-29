import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({  
    title: String,
    description: String,
    avatar: String,
    status: String,
    slug: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
});
  

const Topic = mongoose.model('Topic', topicSchema, 'topics');
export default Topic;