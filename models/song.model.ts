import mongoose from "mongoose";
import slug from 'mongoose-slug-updater'
mongoose.plugin(slug)

const songSchema = new mongoose.Schema({  
    title: String,
    avatar: String,
    description: String,
    singerId: String,
    topicId: String,
    like: Number,
    listen: {
        type: Number,
        default: 0
    },
    lyrics: String,
    audio: String,
    status: String,
    slug: { type: String, slug: "title" },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
});
  

const Song = mongoose.model('Song', songSchema, 'songs');
export default Song;