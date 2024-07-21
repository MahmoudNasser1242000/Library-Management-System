import jwt from "jsonwebtoken";
import userModel from "../backend/models/users.js";

export const protectAuth = async (req, res, next) => {
    const {authorization} = req.headers;
    if (authorization) {
        const token = authorization.split(" ")[1];
        const decodeToken = jwt.verify(token, "jsonWebToken");
        if (decodeToken.UserId) {
            const data = await userModel.findByPk(`${decodeToken.UserId}`);
            if (data) {
                req.role = data.role
                req.userId = data.id
                next()
            } else {
                res.status(401).json({msg: "You are not login, Please login to access this route"})
            }
        }
    } else {
        res.status(401).json({msg: "You are not login, Please login to access this route"})
    }
}