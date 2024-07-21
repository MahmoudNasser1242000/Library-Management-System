import express from "express" 
import { testConnection } from "./backend/dbConnection.js";
import userRouter from "./src/modules/User/users.routes.js";
import bookRouter from "./src/modules/Books/books.routes.js";
import borrowRouter from "./src/modules/Borrow Book/borrow.routes.js";

const app = express();
app.use(express.json());

testConnection();

app.use("/api/v1/users", userRouter)
app.use("/api/v1/books", bookRouter)
app.use("/api/v1/borrow", borrowRouter)

app.get('/', (req, res, next) => {
    res.json('Welcome to our library management system');
})

app.use('*', (req, res, next) => {
    res.json('404 page not found');
})

app.listen(3000, () => {
    console.info(`Server listen on port 3000`);
})