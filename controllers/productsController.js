const pool = require("../config/db")

const getAllProduct = async (req, res) => {
    try {
        const query = `SELECT 
            p.id AS product_id,
            p.name,
            p.description,
            p.qty_in_stock,
            p.price,
            p.discount_price,
            p.created_at,
            p.updated_at,
            COALESCE(
                JSON_AGG(
                    pi.image_url
                ) FILTER (WHERE pi.id IS NOT NULL), 
                '[]'
            ) AS images
        FROM 
            Product p
        LEFT JOIN 
            ProductImages pi 
        ON 
            p.id = pi.product_id
        GROUP BY 
            p.id;
        `
        const products = await pool.query(query)
        return res.status(200).json({ "products": products.rows })
    } catch (error) {
        console.log(error)
        return res.status(500).json('Somethings when wrong on server!')
    }
}

const getAllProductByUser = async (req, res) => {
    const { username } = req.params
    try {
        const user = await pool.query('SELECT * FROM Users WHERE username=$1', [username])
        if (!user.rows.lenght < 0) {
            return res.status(404).json('Cannot found this user!')
        }
        const products = await pool.query("SELECT * FROM Product p WHERE user_id=$1", [user.rows[0].id])

        return res.status(200).json({
            "user": user.rows[0],
            "products": products.rows
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json('Somethings when wrong on server!')
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params

    try {
        const product = await pool.query(`
            SELECT 
            p.id, 
            p.name, 
            p.description, 
            p.qty_in_stock, 
            p.price, 
            p.discount_price, 
            p.created_at,
            COALESCE(
            JSON_AGG(
                pi.image_url
            ) FILTER (WHERE pi.id IS NOT NULL), 
            '[]') AS images
            FROM  Product p LEFT JOIN ProductImages pi
            ON p.id = pi.product_id
            WHERE p.id=$1
            GROUP BY p.id;
        `, [id])
        if(!product.rows[0]){
            return res.status(404).json({
                "message": "Product not found."
            })
        }
        return res.status(200).json({
            "product": product.rows[0]
        })
    } catch (error) {
        return res.status(500).json('Somethings when wrong on server!')
    }
}

const createNewProduct = async (req, res) => {
    const {name, description, qty_in_stock, price, discount_price} = req.body;
    const files = req.files;
    try {
        const result = await pool.query("INSERT INTO Product(name, description, qty_in_stock, price, discount_price, user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id", [name, description, qty_in_stock, price, discount_price, req.user.id])
        const productId = result.rows[0].id;
        console.log(productId)
        console.log(files)
        if(files && files.length > 0){
            const imageQueries = files.map(file => {
                const imageUrl = `/uploads/${file.filename}`;
                return pool.query(
                    `INSERT INTO ProductImages (image_url, product_id)
                    VALUES ($1, $2)`,
                    [imageUrl, productId]
                );
            });

            await Promise.all(imageQueries);
        }
        await pool.query('COMMIT');
        return res.status(201).json({ "message": "Created new product successfully."})
    } catch (error) {
        return res.status(500).json('Somethings when wrong on server!')
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {name, description, qty_in_stock, price, discount_price} = req.body;

    try {
        pool.query("UPDATE Product SET name=$1, description=$2, qty_in_stock=$3, price=$4, discount_price=$5 WHERE user_id=$6 AND id=$7", [name, description, qty_in_stock, price, discount_price, req.user.id, id])
        return res.status(200).json({ "message": "Product updated successfully." })
    } catch (error) {
        return res.status(500).json('Somethings when wrong on server!')
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const isDeleted = await pool.query("DELETE FROM Product WHERE id=$1 AND user_id", [id, req.user.id]);
        if(!isDeleted){
            return res.json({ "message": "Delete unsuccessfully."})
        }
        return res.status(200).json({"message": "Deleted product successfully."})

    } catch (error) {
        return res.status(500).json('Somethings when wrong on server!')
    }
}

module.exports = {
    getAllProduct,
    getAllProductByUser,
    getProductById,
    createNewProduct,
    updateProduct,
    deleteProduct
}