const pool = require("../config/db")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    const { username, first_name, last_name, password } = req.body

    if (!username || !first_name || !last_name || !password) {
        return res.status(400).json({ "message": "All fields is requried." })
    }

    try {
        const user = await pool.query("SELECT * FROM Users WHERE username=$1", [username])
        if (user.rows[0]) {
            return res.status(400).json({ "message": "User with this username is already exist." })
        }

        const hash = await bcrypt.genSalt(10)
        const hasedPassword = await bcrypt.hash(password, hash)

        await pool.query("INSERT INTO Users(username, first_name, last_name, password) VALUES ($1, $2, $3, $4)", [username, first_name, last_name, hasedPassword])
        return res.status(201).json({
            "message": "Succesfully registered a new user"
        })
    } catch (err) {
        return res.status(500).send("Somethings went wrong!")
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await pool.query("SELECT * FROM Users WHERE username=$1", [username])

        if (!user.rows[0]) {
            return res.status(400).json({
                "Message": "Invalid username or password."
            })
        }

        const checkPassword = await bcrypt.compare(password, user.rows[0].password)

        if (!checkPassword) {
            return res.status(400).json({
                "Message": "Invalid username or password."
            })
        }

        const token = jwt.sign({ id: user.rows[0].id }, "JWT_SECRET", { expiresIn: "1h" });

        return res.status(200).json({
            "token": token
        })
    }
    catch (err) {
        return res.status(500).send("Somethings went wrong!")
    }
}

module.exports = {
    registerUser,
    loginUser
}