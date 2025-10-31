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
            id: quote._id,
            text: quote.text,
            author: quote.author,
            tags: quote.tags
        });
    } catch (err) {
        next(err);
    }
};

export const getQuoteById = async (req, res, next) => {
    try {
        const quote = await Quote.findById(req.params.id);

        if (!quote) {
            const error = new Error('Quote not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: quote });
    } catch (err) {
        next(err);
    }
};