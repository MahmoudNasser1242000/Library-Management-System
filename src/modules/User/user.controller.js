import userModel from "../../../backend/models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// @desc      Register
// @route     post /api/v1/users/signup
// @access    Public
export const signup = async (req, res) => {
    const {username, email, password, role} = req.body;
    try {
        const hashPassword = bcrypt.hashSync(password, 8);
        const data = await userModel.findOrCreate({
            where: {email},
            defaults: {
                username,
                email,
                password: hashPassword,
                role
            }
        })

        if (data[1]) {
            const Token = jwt.sign({UserId: data[0].id}, "jsonWebToken", {
                expiresIn: "1y"
            })
            const user = data[0].dataValues? {...data[0].dataValues} : {...data[0]}
            res.status(201).json({msg: "Signin succcessfully", data: {...user, Token}});
        } else {
            res.status(400).json({msg: "User allready exists"})
        }
    } catch (error) {
        res.status(400).json({msg: "Can't resgister", error})
    }
}

// @desc      Login
// @route     Post /api/v1/users/signin
// @access    Public
export const signin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const data = await userModel.findOne({
            where: { email },
        });

        if (data) {
            const compare = bcrypt.compareSync(password, data.password);
            if (compare) {
                const Token = jwt.sign({UserId: data.id}, "jsonWebToken", {
                    expiresIn: "1y"
                })
                const user = data.dataValues? {...data.dataValues} : {...data}
                res.status(201).json({msg: "Login successfully", data: {...user, Token}})
            } else {
                res.status(400).json({msg: "Email or Password is wrong"})
            }
        } else {
            res.status(400).json({msg: "Cant't find user with this email"})
        }
    } catch (error) {
        res.status(400).json({msg: "Can't signin", error})
    }
}