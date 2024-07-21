import bookModel from "../backend/models/books.js";

export const checkAvailableBook = async (req, res, next) => {
    const { bookId } = req.params;
    try {
        const data = await bookModel.findByPk(bookId);
        if (!data) {
            res.status(400).json({ error: "Cant't find book with this id" })
        } else {
            if (data.available) {
                req.book = data
                next()
            } else {
                res.status(400).json({ error: "Book is not available" })
            }
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}