import { Router } from "express";
import { protectAuth } from "../../../middlewares/protectAuthUsers.js";
import { checkAdmin } from "../../../middlewares/checkAdmin.js";
import { addBooks, deleteBook, getBooks, searchBooks, updateBook } from "./books.controller.js";
import { checkBook } from "../../../middlewares/CheckBook.js";

const bookRouter = Router();

bookRouter.post("/", protectAuth, checkAdmin, addBooks);
bookRouter.get("/", protectAuth, getBooks);
bookRouter.patch("/:id", protectAuth, checkAdmin, checkBook, updateBook);
bookRouter.delete("/:id", protectAuth, checkAdmin, checkBook, deleteBook);
bookRouter.get("/search", protectAuth, searchBooks);

export default bookRouter