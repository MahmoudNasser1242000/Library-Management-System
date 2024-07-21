import bookModel from "../../../backend/models/books.js";

// @desc      Borrow Book
// @route     Patch /api/v1/borrow/:bookId
// @access    Public
export const updateBorrowedBook = async (req, res) => {
    const { bookId } = req.params;
    const userId = req.userId
    try {
        const data = await bookModel.update(
            {
                borrowerId: userId
            },
            { where: { id: bookId } }
        );
        res.status(200).json({ msg: "book be borrowed successfully" });
    } catch (error) {
        res.status(400).json({ msg: "Can't borrow book", error })
    }
}

// @desc      Return Borrowed Book
// @route     Patch /api/v1/borrow/return/:bookId
// @access    Public
export const updateReturnedBook = async (req, res) => {
    const { bookId } = req.params;
    try {
        const data = await bookModel.update(
            {
                borrowerId: null
            },
            { where: { id: bookId } }
        );
        res.status(200).json({ msg: "book be returned successfully" });
    } catch (error) {
        res.status(400).json({ msg: "Can't return book", error })
    }
}

// @desc      Get Borrowed Book
// @route     Get /api/v1/borrow/borrowedList
// @access    Public
export const getBorrowedBooksList = async (req, res) => {
    const { bookId } = req.params;
    const userId = req.userId
    try {
        const data = await bookModel.findAll(
            { where: { borrowerId: userId } }
        );
        res.status(200).json({ length: data.length, BorrowedBookList: data });
    } catch (error) {
        res.status(400).json({ msg: "Can't return book", error })
    }
}