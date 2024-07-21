export const checkBorrowedBook = async (req, res, next) => {
    const borrower = req.book.borrowerId;
    if (borrower) {
        res.status(404).json({msg: "book is allready borrowed"})
    } else {
        next()
    }
}