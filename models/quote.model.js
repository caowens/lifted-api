import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    text: { 
        type: String,
        required: true,
        unique: true
    },
    author: { type: String },
    tags: [String],
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        default: null
    }, // null = public
});

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;
