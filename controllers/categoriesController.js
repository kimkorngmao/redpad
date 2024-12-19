const pool = require("../config/db")

const getAllCategories = async (req, res) => {
    const categories = await pool.query("SELECT * FROM Category")
    return res.json({
        "categories": categories.rows
    })
}

const createNewCategory = async (req,res) => {
    const {name, description} = req.body
    if(!name){
        return res.status(201).json({ "message": "Name is required."})
    }
    try {
        await pool.query("INSERT INTO Category(name, description) VALUES ($1, $2)", [name, description])
        return res.status(201).json({ "message": "Category created successfully."})
    } catch (error) {
        return res.status(500).json({ "message": "Something went wrong on server."})
    }
}

const getCategory = async (req, res) => {
    const { id } = req.params
    try {
        const category = await pool.query("SELECT * FROM Category WHERE id=$1", [id])
        if(!category.rows.length < 0){
            return res.status(404).json({ "message": "Category not found."})
        }
        return res.status(200).json({
            "category": category.rows[0]
        })
    } catch (error) {
        return res.status(500).json({ "message": "Something went wrong on server."})
    }
}

const updateCategory = async (req, res) => {
    const { id } = req.params
    const {name, description} = req.body
    try {
        await pool.query("UPDATE Category SET name=$1, description=$2 WHERE id=$3", [name, description, id])
        return res.status(200).json({ "message": "Category updated successfully."})
    } catch (error) {
        return res.status(500).json({ "message": "Something went wrong on server."})
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params
    try {
        await pool.query("DELETE FROM Category WHERE id=$1",[id])
        return res.status(200).json({ "message": "Category deleted successfully."})
    } catch (error) {
        return res.status(500).json({ "message": "Something went wrong on server."})
    }
}

module.exports = {
    getAllCategories,
    createNewCategory,
    getCategory,
    updateCategory,
    deleteCategory
}