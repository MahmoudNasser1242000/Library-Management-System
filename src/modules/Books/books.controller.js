import { Op } from "sequelize";
import bookModel from "../../../backend/models/books.js"

// @desc      Add New Book
// @route     Post /api/v1/books/
// @access    admin
export const addBooks = async (req, res) => {
    const { title, price, author, genre, available } = req.body
    try {
        const data = await bookModel.findOrCreate({
            where: { title },
            defaults: {
                title,
                price,
                author,
                genre,
                available
            }
        })

        if (data[1]) {
            res.status(201).json({ msg: "Book added successfully", data: data[0] });
        } else {
            res.status(400).json({ msg: "Book allready exists" })
        }
    } catch (error) {
        res.status(400).json({ msg: "Can't add book", error })
    }
}

// @desc      Get All Books
// @route     Get /api/v1/books/
// @access    Public
export const getBooks = async (req, res) => {
    console.log(req.query);
    try {
        const data = await bookModel.findAll({
            where: {
                available: true,
            }
        });
        res.status(200).json({ length: data.length, data });
    } catch (error) {
        res.status(400).json({ msg: "Can't find book", error })
    }
}

// @desc      Search For Books
// @route     Get /api/v1/books/search
// @access    Public
export const searchBooks = async (req, res) => {
    let { title, author, genre } = req.query
    const search = (title || author || genre) ? {[Op.or]: [
        { 'title': { [Op.like]: `%${title}%` }  },
        { 'author': { [Op.like]: `%${author}%` } },
        { 'genre': { [Op.like]: `%${genre}%` } },
    ]} : {}
    try {
        const data = await bookModel.findAll({
            where: {
                available: true,
                ...search
            }
        });
        res.status(200).json({ length: data.length, data });
    } catch (error) {
        res.status(400).json({ msg: "Can't find book", error })
    }
}

// @desc      Update Books
// @route     Patch /api/v1/books/:id
// @access    admin
export const updateBook = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await bookModel.update(
            req.body,
            { where: { id } }
        );
        res.status(200).json({ msg: "book updated successfully" });
    } catch (error) {
        res.status(400).json({ msg: "Can't update book", error })
    }
}

// @desc      Delete Books
// @route     Delete /api/v1/books/:id
// @access    admin
export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await bookModel.destroy(
            { where: { id } }
        );
        res.status(200).json({ msg: "book deleted successfully" });
    } catch (error) {
        res.status(400).json({ msg: "Can't update book", error })
    }
}