import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Quote text is required'],
        trim: true,
        minLength: 1,
        maxLength: 1000,
    },
    author : {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    isPublic: {
        type: Boolean,
        default: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        index: true,
    }
}, { timestamps: true });

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;