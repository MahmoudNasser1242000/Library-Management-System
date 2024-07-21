import bookModel from "../backend/models/books.js";

export const checkBook = async (req, res, next) => {
    const { id, bookId } = req.params;
    try {
        const data = await bookModel.findByPk(id || bookId);
        if (!data) {
            res.status(400).json({ error: "Cant't find book with this id" })
        } else {
            req.book = data
            next()
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}