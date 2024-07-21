export const checkReturnedBook = async (req, res, next) => {
    const borrower = req.book.borrowerId;
    const userId = req.userId;
    if (borrower && borrower === userId) {
        next()
    } else {
        res.status(400).json({msg: "You had never borrowed this book"})
    }
}