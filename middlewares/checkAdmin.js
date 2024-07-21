export const checkAdmin = async (req, res, next) => {
    const role = req.role;
    if (role === "admin") {
        next()
    } else {
        res.status(403).json({msg: "you are not admin, you can't access this route"})
    }
}