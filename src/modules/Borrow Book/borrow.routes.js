import { Router } from "express";
import { protectAuth } from "../../../middlewares/protectAuthUsers.js";
import {
    getBorrowedBooksList,
    updateBorrowedBook,
    updateReturnedBook,
} from "./borrow.controller.js";
import { checkBook } from "../../../middlewares/CheckBook.js";
import { checkBorrowedBook } from "../../../middlewares/checkBorrowedBook.js";
import { checkReturnedBook } from "../../../middlewares/checkReturnedBook.js";
import { checkAvailableBook } from "../../../middlewares/checkAvailableBook.js";

const borrowRouter = Router();

borrowRouter.patch(
    "/:bookId",
    protectAuth,
    checkBook,
    checkAvailableBook,
    checkBorrowedBook,
    updateBorrowedBook
);
borrowRouter.patch(
    "/return/:bookId",
    protectAuth,
    checkBook,
    checkReturnedBook,
    updateReturnedBook
);
borrowRouter.get("/borrowedList", protectAuth, getBorrowedBooksList);

export default borrowRouter;
