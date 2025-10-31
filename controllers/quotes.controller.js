import Quote from "../models/quote.model.js";

export const getRandomQuote = async (req, res, next) => {
    try {
        const arr = await Quote.aggregate([
            { $match: { userId: null } },
            { $sample: { size: 1 } }
        ]);

        if (!arr.length) {
            return res.status(404).json({ message: "No public quotes available" });
        }

        const quote = arr[0];
        res.json({
            text: quote.text,
            author: quote.author,
            tags: quote.tags
        });
    } catch (err) {
        next(err);
    }
};