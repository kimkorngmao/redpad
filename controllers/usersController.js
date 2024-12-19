const pool = require("../config/db")

const getCurrentUser = async (req, res)=>{
    const user = await pool.query("SELECT * FROM Users WHERE id=$1", [req.user.id])
    return res.json({
        "user": user.rows[0]
    })
}

const updateCurrentUser = async (req, res)=>{
    const {username, first_name, last_name } = req.body
    try {
        await pool.query("UPDATE Users SET username=$1, first_name=$2, last_name=$3 WHERE id=$4", [username, first_name, last_name, req.user.id])

        return res.status(200).json({
            "message": "Updated user successfully."
        })
    } catch (error) {
        return res.status(500).json({
            "message": "Something when wrong"
        })
    }
}

module.exports = {
    getCurrentUser,
    updateCurrentUser
}