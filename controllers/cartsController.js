const pool = require('../config/db')

const getCurrentUserCart = async (req, res) => {
    try {
        const query = `
            SELECT 
                c.id, 
                c.qty,
                COALESCE(
                    JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'id', p.id,
                            'name', p.name, 
                            'description', p.description, 
                            'qty_in_stock', p.qty_in_stock, 
                            'price', p.price, 
                            'discount_price', p.discount_price, 
                            'created_at', p.created_at
                        )
                    ) FILTER (WHERE p.id IS NOT NULL), 
                    '[]'
                ) AS products
            FROM Cart c
            JOIN Product p
                ON c.product_id = p.id
            WHERE c.user_id = $1
            GROUP BY c.id, c.qty;
        `
        const cartItems = await pool.query(query,[req.user.id])
        return res.status(200).json({
            "items": cartItems.rows
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "message": "Something went wrong on server."})
    }
}

const addToCart = async (req, res) => {
    const { itemId, quantity } = req.body;

    if (!itemId || !quantity) {
        return res.status(400).json({ "message": "All fields are required." });
    }

    try {
        const checkItem = await pool.query("SELECT * FROM Product WHERE id=$1", [itemId]);
        if (!checkItem.rows[0]) {
            return res.status(404).json({ "message": "There are no this product found." });
        }

        const checkCart = await pool.query(
            "SELECT * FROM Cart WHERE product_id=$1 AND user_id=$2",
            [itemId, req.user.id]
        );

        if (checkCart.rows[0]) {
            await pool.query(
                "UPDATE Cart SET qty=qty+$1 WHERE product_id=$2 AND user_id=$3",
                [quantity, itemId, req.user.id]
            );
            return res.status(200).json({ "message": "Cart updated successfully." });
        }

        await pool.query(
            "INSERT INTO Cart (product_id, user_id, qty) VALUES ($1, $2, $3)",
            [itemId, req.user.id, quantity]
        );

        return res.status(201).json({ "message": "Added to cart successfully." });
    } catch (error) {
        return res.status(500).json({ "message": "Something went wrong on server." });
    }
};

const removeCart = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM Cart WHERE product_id=$1 AND user_id=$2", [id, req.user.id])
        return res.status(200).json({ "message": "Cart removed successfully." });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "message": "Something went wrong on server." });
    }
}

module.exports = {
    getCurrentUserCart,
    addToCart,
    removeCart
}