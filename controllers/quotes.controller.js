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


        if (quote.userId && quote.userId.toString() !== req.user?.id.toString()) {
            const error = new Error('Unauthorized access');
            error.statusCode = 403;
            throw error;
        }

        res.status(200).json({ success: true, data: quote });
    } catch (err) {
        next(err);
    }
};

export const createPrivateQuote = async (req, res, next) => {
    try {
        const quote = await Quote.create({
            text: req.body.text,
            author: req.body.author,
            tags: req.body.tags,
            userId: req.user._id  // make it private
        });

        res.status(201).json({ success: true, data: quote });
    } catch (error) {
        next(error);
    }
};

export const editPrivateQuote = async (req, res, next) => {
    try {
        const quote = await Quote.findById(req.params.id);

        if (!quote) {
            const error = new Error('Quote not found');
            error.statusCode = 404;
            throw error;
        }


        if (quote.userId && quote.userId.toString() !== req.user?.id.toString()) {
            const error = new Error('Unauthorized access');
            error.statusCode = 403;
            throw error;
        }

        const updatedQuote = await Quote.findByIdAndUpdate(
            req.params.id,
            { text: req.body.text, author: req.body.author, tags: req.body.tags },
            { new: true }
        );

        res.status(200).json({ success: true, data: updatedQuote });
    } catch (error) {
        next(error);
    }
};

export const deletePrivateQuote = async (req, res, next) => {
    try {
        const quote = await Quote.findById(req.params.id);

        if (!quote) {
            const error = new Error('Quote not found');
            error.statusCode = 404;
            throw error;
        }
        if (quote.userId && quote.userId.toString() !== req.user?.id.toString()) {
            const error = new Error('Unauthorized access');
            error.statusCode = 403;
            throw error;
        }

        await Quote.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: 'Quote deleted successfully' });
    } catch (error) {
        next(error);
    }
}